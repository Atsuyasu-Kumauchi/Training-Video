import { ASSIGNMENT_LIST, ERoleName, IAssignmentReviewerDto, IUserDto, ListQueryConfig, Messages, USERS } from '@/common';
import { useToast } from '@/hooks';
import { AuthServer, queryClient, TFormHandlerSubmit, TUiFormRef, UiForm, wait } from '@/tmsui';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { defaultValues, reviewFetch, TUserFormComponentSchema, TUserSchema, userSchema } from './user.form.type';
import UserFormView from './user.form.view';



export default function UserFormComponent({ modalRef, editData, isEdit }: TUserFormComponentSchema) {
    const { toastSuccess } = useToast();
    const formRef = useRef<TUiFormRef<TUserSchema>>(null)

    const firstReviewData = reviewFetch({
        queryKey: ["DIRECT_MANAGER"],
        url: ASSIGNMENT_LIST.REVIEWERS,
    }).data?.filter((item: IAssignmentReviewerDto) => item.roleName == ERoleName.DIRECT_MANAGER)

    const secondReviewData = reviewFetch({
        queryKey: ["SENIOR_MANAGER"],
        url: ASSIGNMENT_LIST.REVIEWERS,
    }).data?.filter((item: IAssignmentReviewerDto) => item.roleName == ERoleName.SENIOR_MANAGER)

    const finalReviewData = reviewFetch({
        queryKey: ["EMPOWERMENT"],
        url: ASSIGNMENT_LIST.REVIEWERS,
    }).data?.filter((item: IAssignmentReviewerDto) => item.roleName == ERoleName.EMPOWERMENT)


    const userMutation = useMutation({
        mutationKey: isEdit ? ["user-update"] : ["user-create"],
        mutationFn: async (data: TUserSchema) => {
            const response = await AuthServer({
                method: isEdit ? "PUT" : "POST",
                url: isEdit ? USERS.UPDATE(editData?.userId ?? "") : USERS.CREATE,
                data,
            });
            await wait();
            return response.data;
        },

        onMutate: async (newUser) => {
            // চলমান query cancel
            await queryClient.cancelQueries({ queryKey: ListQueryConfig.USER.key });
            // আগের data save রাখি (rollback জন্য)
            const previousUsers = queryClient.getQueryData<IUserDto[]>(ListQueryConfig.USER.key);
            // 🔥 Optimistic update
            queryClient.setQueryData(ListQueryConfig.USER.key,
                (old: IUserDto[]) => {
                    if (!old) return old;
                    // ✏️ Update case
                    if (isEdit) { return old.map((u: IUserDto) => u.userId === editData?.userId ? { ...u, ...newUser } : u); }
                    // ➕ Create case
                    return [...old, { ...newUser, userId: "temp-id" }];
                }
            );
            // 🔁 context return করি
            return { previousUsers };
        },
        // 🔹 2️⃣ Error হলে rollback
        onError: (_err, _newUser, context) => {
            queryClient.setQueryData(ListQueryConfig.USER.key, context?.previousUsers);
        },

        // 🔹 3️⃣ Success হলে UI clean
        onSuccess: () => {
            formRef.current?.reset();
            modalRef?.current?.modalClose?.();
            toastSuccess(Messages.OPERATION_SUCCESS);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ListQueryConfig.USER.key,
            });
        },
    })

    const onSubmit: TFormHandlerSubmit<TUserSchema> = (value) => {
        const username = value?.email;
        const modifyValue = { ...value, username, reviewers: [Number(value.firstReview), Number(value.secondReview), Number(value.finalReview)] };
        delete modifyValue.firstReview;
        delete modifyValue.secondReview;
        delete modifyValue.finalReview;
        userMutation.mutate({ ...modifyValue, username } as TUserSchema);
    }

    return (
        <UiForm
            schema={userSchema}
            initialValues={defaultValues(isEdit, editData as IUserDto)}
            onSubmit={onSubmit}
            ref={formRef}
        >
            <UserFormView
                modalRef={modalRef}
                isEdit={isEdit}
                isPending={userMutation.isPending}
                firstReviewData={firstReviewData as IAssignmentReviewerDto[]}
                secondReviewData={secondReviewData as IAssignmentReviewerDto[]}
                finalReviewData={finalReviewData as IAssignmentReviewerDto[]}
            />
        </UiForm>
    )
}

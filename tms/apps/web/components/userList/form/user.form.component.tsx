import { IUserDto, ListQueryConfig, USERS } from '@/common';
import { AuthServer, queryClient, TFormHandlerSubmit, TUiFormRef, UiForm } from '@/tmsui';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { defaultValues, TUserFormComponentSchema, TUserSchema, userSchema } from './user.form.type';
import UserFormView from './user.form.view';

type TReviewFetch = {
    queryKey: string[]
    url: string
    params: Record<string, string>
}

const reviewFetch = ({ params, queryKey, url }: TReviewFetch) => {
    return useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const response = await AuthServer({
                method: "GET",
                url: url,
                params: params
            });
            return response.data;
        },
    })
}

const getByReview = (data: IUserDto[], reviewId: number) => {
    const review = data?.find((item: IUserDto) => Number(item.userId) === reviewId)
    return review
}


export default function UserFormComponent({ modalRef, editData, isEdit }: TUserFormComponentSchema) {
    const formRef = useRef<TUiFormRef<TUserSchema>>(null)
    console.log("editData", editData);



    const firstReviewData = reviewFetch({
        queryKey: ["USER_REVIEW_ONE"],
        url: USERS.USER_REVIEW,
        params: { role: "senior-manager" }
    })

    const secondReviewData = reviewFetch({
        queryKey: ["USER_REVIEW_TWO"],
        url: USERS.USER_REVIEW,
        params: { role: "senior-manager" }
    })

    const finalReviewData = reviewFetch({
        queryKey: ["USER_REVIEW_FINAL"],
        url: USERS.USER_REVIEW,
        params: { role: "senior-manager" }
    })

    const userMutation = useMutation({
        mutationKey: isEdit ? ["user-update"] : ["user-create"],
        mutationFn: async (data: TUserSchema) => {
            const response = await AuthServer({
                method: isEdit ? "PUT" : "POST",
                url: isEdit ? USERS.UPDATE(editData?.userId ?? "") : USERS.CREATE,
                data,
            });
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
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ListQueryConfig.USER.key,
            });
        },
    })


    const onSubmit: TFormHandlerSubmit<TUserSchema> = (value) => {
        const firstReview = getByReview(firstReviewData.data, Number(value.firstReview))
        const secondReview = getByReview(secondReviewData.data, Number(value.secondReview))
        const finalReview = getByReview(finalReviewData.data, Number(value.finalReview))
        const username = value?.email;
        const modifyValue = { ...value, username, reviewers: [1, 1, 1] };
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
                isPending={userMutation.isPending}
                firstReviewData={firstReviewData.data}
                secondReviewData={secondReviewData.data}
                finalReviewData={finalReviewData.data}
            />
        </UiForm>
    )
}

import { CAssignmentListDto, IAssignmentListDto } from '@/common';
import useLang from '@/lang';
import { LangListOfIssues } from '@/lang/listOfIssues';
import { Button, TUiBasicModalRef, UiBasicModal, uiBasicModalRefDefaultValue } from '@/tmsui';
import { TListColumnDef } from '@/tmsui/types';
import { useRef } from 'react';
import AssignmentListFormComponent from '../form/assignmentList.form.component';

const { list } = LangListOfIssues;

export const assignmentListColumn: TListColumnDef<CAssignmentListDto>[] = [

    {
        accessorKey: "name",
        enableHiding: false,
        header: () => list.name,
        cell: (ctx) => {
            return <div>{ctx.row.original.name}</div>
        }
    },
    {
        accessorKey: "question",
        enableHiding: false,
        header: () => list.question,
        cell: (ctx) => {
            return <div>{ctx.row.original.question}</div>
        }
    },
    {
        accessorKey: "actions",
        enableHiding: false,
        header: () => list.actions,
        cell: (ctx) => {
            return (
                <div className="flex items-center space-x-2">
                    <AssignmentListEdit {...ctx.row.original} />
                    <AssignmentListDelete />
                </div>
            )
        }
    }
]


export const AssignmentListEdit = (assignmentList: IAssignmentListDto) => {
    const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
    const { listOfIssues } = useLang();
    const isEdit = !!assignmentList.assignmentId || false;
    return (
        <>
            <Button onClick={() => modalRef.current.modalOpen()} variant="ghost" color='primary' className='p-0' startIcon='edit' />
            <UiBasicModal
                modalRef={modalRef}
                title={listOfIssues.form.editTitle}
                body={<AssignmentListFormComponent isEdit={isEdit} editData={assignmentList} modalRef={modalRef} />}
            />
        </>
    )
}

export const AssignmentListDelete = () => {
    return (
        <>
            <Button color='danger' variant="ghost" className='p-0' disabled startIcon='delete' />
        </>
    )
}
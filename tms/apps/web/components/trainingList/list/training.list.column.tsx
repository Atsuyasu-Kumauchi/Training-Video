
import { CTrainingsDto, ITrainingsDto } from '@/common';
import { Badge } from '@/common/components/badge';
import useLang from '@/lang';
import { LangTrainingList } from '@/lang/trainingList';
import { Button, TUiBasicModalRef, UiBasicModal, uiBasicModalRefDefaultValue } from '@/tmsui';
import { TListColumnDef } from '@/tmsui/types';
import { useRef } from 'react';
import TrainingFormComponent from '../form/training.form.component';

const { list } = LangTrainingList;

export const trainingListColumn: TListColumnDef<CTrainingsDto>[] = [

    {
        accessorKey: "name",
        enableHiding: false,
        header: () => list.training,
        cell: (ctx) => {
            return (
                <div>
                    <div className='text-sm font-medium text-gray-900'>{ctx.row.original.name}</div>
                    <div className='text-sm text-gray-500'>{ctx.row.original.description}</div>
                </div>
            )
        }
    },
    {
        accessorKey: "trainingId",
        enableHiding: false,
        header: () => list.registered,
        cell: (ctx) => {
            return <div>N/A</div>
        }
    },
    {
        accessorKey: "userId",
        enableHiding: false,
        header: () => list.completion,
        cell: (ctx) => {
            return <div>N/A</div>
        }
    },
    {
        accessorKey: "deadline",
        enableHiding: false,
        header: () => list.incomplete,
        cell: (ctx) => {
            return <div>N/A</div>
        }
    },
    {
        accessorKey: "status",
        enableHiding: false,
        header: () => list.status,
        cell: (ctx) => {
            return <Badge status={ctx.row.original.status ? "Active" : "Inactive"} />
        }
    },
    {
        accessorKey: "actions",
        enableHiding: false,
        header: () => list.actions,
        cell: ({ row }) => {
            return (
                <div className="flex items-center space-x-2">
                    <TrainingView {...row.original} />
                    <TrainingEdit {...row.original} />
                    <TrainingDelete />
                </div>
            )
        }
    }
]

export const TrainingView = (training: ITrainingsDto) => {
    const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
    return (
        <div className="flex items-center space-x-2">
            <Button onClick={() => modalRef.current.modalOpen()} variant="ghost" color='primary' className='p-0' startIcon='view' />
            <UiBasicModal
                modalRef={modalRef}
                title="Training Details - JavaScript Fundamentals"
                body={<div>Training Details - JavaScript Fundamentals</div>}
            />
        </div>
    )
}
export const TrainingEdit = (training: ITrainingsDto) => {
    const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
    const { user: userLang } = useLang();
    const isEdit = !!training.trainingId || false;

    return (
        <>
            <Button onClick={() => modalRef.current.modalOpen()} variant="ghost" color='primary' className='p-0' startIcon='edit' />
            <UiBasicModal
                modalRef={modalRef}
                title={userLang.form.editUser}
                body={<TrainingFormComponent isEdit={isEdit} editData={training} modalRef={modalRef} />}
            />
        </>
    )
}
export const TrainingDelete = () => {
    return (
        <>
            <Button color='danger' variant="ghost" className='p-0' disabled startIcon='delete' />
        </>
    )
}
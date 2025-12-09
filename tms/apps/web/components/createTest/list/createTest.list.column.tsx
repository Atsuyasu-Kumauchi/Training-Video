import { CTestCreationDto } from '@/common';
import { Badge } from '@/common/components/badge';
import { LangTestCreation } from '@/lang/testCreation';
import { Button } from '@/tmsui';
import { TListColumnDef } from '@/tmsui/types';
import { TUiBasicModalRef, UiBasicModal, uiBasicModalRefDefaultValue } from '@/tmsui/ui/UIBasicModal';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';

const { list } = LangTestCreation;

export const createTestListColumn: TListColumnDef<CTestCreationDto>[] = [

    {
        accessorKey: "test",
        enableHiding: false,
        header: () => list.test,
        cell: (ctx) => {
            return <div>{ctx.row.original.test}</div>
        }
    },
    {
        accessorKey: "category",
        enableHiding: false,
        header: () => list.category,
        cell: (ctx) => {
            return <div>{ctx.row.original.category}</div>
        }
    },
    {
        accessorKey: "status",
        enableHiding: false,
        header: () => list.status,
        cell: (ctx) => {
            return <Badge status={ctx.row.original.status} />
        }
    },
    {
        accessorKey: "action",
        enableHiding: false,
        header: () => list.action,
        cell: () => <ActionComponent />
    }
]

const ActionComponent = () => {
    const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
    return <div className="flex items-center space-x-2">
        <Button onClick={() => modalRef.current.modalOpen()}>
            <FontAwesomeIcon icon={faEye} />
        </Button>
        <UiBasicModal
            modalRef={modalRef}
            title="Test Modal"
            description="This is a test modal"
            body={<div>This is a test modal body</div>}
        />
        <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200">
            <FontAwesomeIcon icon={faEdit} />
        </button>
        <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
            <FontAwesomeIcon icon={faTrash} />
        </button>
    </div>
}
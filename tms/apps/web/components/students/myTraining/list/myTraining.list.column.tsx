import { CMyTrainingsDto } from '@/common';
import { TListColumnDef } from '@/tmsui/types';

export const myTrainingListColumn: TListColumnDef<CMyTrainingsDto>[] = [

  {
    accessorKey: "name",
    enableHiding: true,
    cell: (ctx) => {
      return <div>{ctx.row.original.name}</div>
    }
  },
]

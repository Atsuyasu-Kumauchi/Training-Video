import { CTagDto, ITagDto } from '@/common';
import { Badge } from '@/common/components/badge';
import useLang from '@/lang';
import { LangTag } from '@/lang/tag';
import { Button } from '@/tmsui';
import { TListColumnDef } from '@/tmsui/types';
import { TUiBasicModalRef, UiBasicModal, uiBasicModalRefDefaultValue } from '@/tmsui/ui/UIBasicModal';
import { useRef } from 'react';
import TagFormComponent from '../form/tag.form.component';

const { list } = LangTag;

export const tagListColumn: TListColumnDef<CTagDto>[] = [

  {
    accessorKey: "name",
    enableHiding: false,
    header: () => list.tagName,
    cell: (ctx) => {
      return <div>{ctx.row.original.name}</div>
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
    accessorKey: "created",
    enableHiding: false,
    header: () => list.creationDate,
    cell: (ctx) => {
      return <div>{ctx.row.original.created}</div>
    }
  },
  {
    accessorKey: "actions",
    enableHiding: false,
    header: () => list.action,
    cell: (ctx) => {
      return (
        <div className="flex items-center space-x-2">
          <TagEdit {...ctx.row.original} />
          <TagDelete />
        </div>
      )
    }
  }
]

export const TagEdit = (tag: ITagDto) => {
  const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
  const { tag: tagLang } = useLang();
  const isEdit = !!tag.tagId || false;

  return (
    <>
      <Button onClick={() => modalRef.current.modalOpen()} variant="ghost" color='primary' className='p-0' startIcon='edit' />
      <UiBasicModal
        modalRef={modalRef}
        title={tagLang.form.updateTags}
        body={<TagFormComponent isEdit={isEdit} editData={tag} modalRef={modalRef} />}
      />
    </>
  )
}

export const TagDelete = () => {
  return (
    <>
      <Button color='danger' variant="ghost" className='p-0' disabled startIcon='delete' />
    </>
  )
}


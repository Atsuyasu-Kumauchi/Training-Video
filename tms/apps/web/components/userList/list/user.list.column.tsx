import { Avatar } from "@/common";
import { Badge } from "@/common/components/badge";
import { CUserDto, IUserDto } from "@/common/dto/user.dto";
import useLang from "@/lang";
import { LangUser } from "@/lang/user";
import { Button, LinkButton } from "@/tmsui";
import { TListColumnDef } from "@/tmsui/types";
import {
  TUiBasicModalRef,
  UiBasicModal,
  uiBasicModalRefDefaultValue,
} from "@/tmsui/ui/UIBasicModal";
import { useRef } from "react";
import UsersDetailsComponent from "../details/users.details.component";
import UserFormComponent from "../form/user.form.component";

const { list } = LangUser;

export const userListColumn: TListColumnDef<CUserDto>[] = [
  {
    accessorKey: "name",
    enableHiding: false,
    header: () => list.user,
    cell: (ctx) => {
      return <Avatar name={ctx.row.original.username} />;
    },
  },
  {
    accessorKey: "email",
    enableHiding: false,
    header: () => list.email,
    cell: (ctx) => {
      return <div>{ctx.row.original.email}</div>;
    },
  },
  {
    accessorKey: "department",
    enableHiding: false,
    header: () => list.department,
    cell: (ctx) => {
      return <div>{ctx.row.original.department?.name}</div>;
    },
  },
  {
    accessorKey: "assigned_training",
    enableHiding: false,
    header: () => list.assignedTraining,
    cell: (ctx) => {
      const original = ctx.row.original;
      return (
        <div>
          <LinkButton
            href={`/admin/users/user-training-details/${ctx.row.original.userId}`}
            variant="ghost"
            color="primary"
          >{original.assigned_training ? original.assigned_training : '0'}</LinkButton>
        </div>
      );
    },
  },
  {
    accessorKey: "completed_training",
    enableHiding: false,
    header: () => list.completedTraining,
    cell: (ctx) => {
      const original = ctx.row.original;
      return (
        <div>
          <LinkButton
            href={`/admin/users/user-training-details/${ctx.row.original.userId}`}
            variant="ghost"
            color="primary"
          >{original.completed_training ? original.completed_training : '0'}</LinkButton>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    enableHiding: false,
    header: () => list.status,
    cell: ({ row: { original } }) => {
      return <Badge status={original.status ? "Active" : "Inactive"} />;
    },
  },
  {
    accessorKey: "actions",
    enableHiding: false,
    header: () => list.actions,
    cell: (ctx) => {
      return (
        <div className="flex items-center space-x-2">
          <UserView {...ctx.row.original} />
          <UserEdit {...ctx.row.original} />
          <UserDelete />
        </div>
      );
    },
  },
];

export const UserView = (user: IUserDto) => {
  const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());

  return (
    <div className="flex items-center space-x-2">
      <Button
        onClick={() => modalRef.current.modalOpen()}
        variant="ghost"
        color="primary"
        className="p-0"
        startIcon="view"
      />
      <UiBasicModal
        modalRef={modalRef}
        title={list.userDetail + ` - ${user?.firstName} ${user?.lastName}`}
        body={<UsersDetailsComponent editData={user} modalRef={modalRef} />}
      />
    </div>
  );
};
export const UserEdit = (user: IUserDto) => {
  const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
  const { user: userLang } = useLang();
  const isEdit = !!user.userId || false;
  return (
    <>
      <Button
        onClick={() => modalRef.current.modalOpen()}
        variant="ghost"
        color="primary"
        className="p-0"
        startIcon="edit"
      />
      <UiBasicModal
        modalRef={modalRef}
        title={userLang.form.editUser}
        body={
          <UserFormComponent
            isEdit={isEdit}
            editData={user}
            modalRef={modalRef}
          />
        }
      />
    </>
  );
};
export const UserDelete = () => {
  return (
    <>
      <Button
        color="danger"
        variant="ghost"
        className="p-0"
        disabled
        startIcon="delete"
      />
    </>
  );
};

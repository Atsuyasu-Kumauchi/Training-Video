import { CTestCreationDto, ITestCreationDto } from "@/common";
import { Badge } from "@/common/components/badge";
import { LangTestCreation } from "@/lang/testCreation";
import { Button } from "@/tmsui";
import { TListColumnDef } from "@/tmsui/types";
import {
  TUiBasicModalRef,
  UiBasicModal,
  uiBasicModalRefDefaultValue,
} from "@/tmsui/ui/UIBasicModal";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const { list } = LangTestCreation;

export const createTestListColumn: TListColumnDef<CTestCreationDto>[] = [
  {
    accessorKey: "test",
    enableHiding: false,
    header: () => list.test,
    cell: (ctx) => {
      return (
        <div>
          <div>{ctx.row.original.name}</div>
          <div>{ctx.row.original.description}</div>
        </div>
      );
    },
  },
  //   {
  //     accessorKey: "category",
  //     enableHiding: false,
  //     header: () => list.category,
  //     cell: (ctx) => {
  //       return <div></div>;
  //     },
  //   },
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
    header: () => list.action,
    cell: (ctx) => {
      return (
        <div className="flex items-center space-x-2">
          <CreateTestView {...ctx.row.original} />
          <CreateTestEdit {...ctx.row.original} />
          <CreateTestDelete />
        </div>
      );
    },
  },
];

export const CreateTestView = (createTest: ITestCreationDto) => {
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
        title="Test Details View"
        body={<div>Create Test View</div>}
      />
    </div>
  );
};

export const CreateTestEdit = (createTest: ITestCreationDto) => {
  const navigate = useRouter();
  const handleEdit = () => {
    navigate.push(`/admin/create-test/add-test/${createTest.testId}`);
    console.log("test", createTest);
  };

  return (
    <>
      <Button
        onClick={handleEdit}
        variant="ghost"
        color="primary"
        className="p-0"
        startIcon="edit"
      />
    </>
  );
};

export const CreateTestDelete = () => {
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

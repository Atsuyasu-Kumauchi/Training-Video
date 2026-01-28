import { CTestCreationDto, ITestCreationDto } from "@/common";
import { Badge } from "@/common/components/badge";
import { LangTestCreation } from "@/lang/testCreation";
import { Button, cn, LinkButton } from "@/tmsui";
import { TListColumnDef } from "@/tmsui/types";
import {
  TUiBasicModalRef,
  UiBasicModal,
  uiBasicModalRefDefaultValue,
} from "@/tmsui/ui/UIBasicModal";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import CreateTestDetailsComponent from "../details/createTest.details.component";

const { list } = LangTestCreation;

const color = ['#2563eb', '#9333ea', '#ca8a04', '#db2777', '#16a34a']
const getRandomColor = () => color[Math.floor(Math.random() * color.length)];

export const createTestListColumn: TListColumnDef<CTestCreationDto>[] = [
  {
    accessorKey: "test",
    enableHiding: false,
    header: () => list.test,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center ")} style={{ background: getRandomColor() }}>
              <FontAwesomeIcon icon={fas.faClipboardCheck} className=" text-white text-sm" />
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {row.original.name}
            </div>
            <div className="text-sm text-gray-500">
              {row.original.description}
            </div>
          </div>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "Tag",
  //   enableHiding: false,
  //   header: () => list.status,
  //   cell: ({ row: { original } }) => {
  //     return <Badge status={original.status ? "Active" : "Inactive"} />;
  //   },
  // },
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
        title={"Test Details - " + createTest?.name}
        body={
          <CreateTestDetailsComponent
            editData={createTest}
            modalRef={modalRef}
          />
        }
      />
    </div>
  );
};

export const CreateTestEdit = (createTest: ITestCreationDto) => {
  return (
    <>
      <LinkButton
        href={`/admin/create-test/edit/${createTest.testId}`}
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

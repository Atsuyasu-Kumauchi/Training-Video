import { ListQueryConfig } from "@/common/apiEnpoint";
import { ITagDto } from "@/common/dto";
import { useFetchList } from "@/hooks";
import useLang from "@/lang";
import { Button, UiFormInput, UiFormSelect, UiFormSelect2, UiFormTextArea } from "@/tmsui";
import { useSettings } from "@/tmsui/store/settings";
import { Fragment } from "react/jsx-runtime";
import {
  assignment,
  TVideoListFormViewSchema,
  TVideoListSchema,
  videoStatus
} from "./videoList.form.type";
import VideoListFormUpload from "./videoList.form.upload";

export default function VideoListFormView({ formRef, modalRef, isEdit }: TVideoListFormViewSchema) {
  const { setIsOpen } = useSettings();
  const { videoList } = useLang();

  return (
    <Fragment>
      <div className="space-y-4">
        <UiFormInput<TVideoListSchema>
          name="name"
          label={videoList.form.videoTitle}
          placeholder=""
        />
        <UiFormTextArea<TVideoListSchema>
          name="description"
          label={videoList.form.explanation}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UiFormSelect2<TVideoListSchema>
            isMulti
            name="audienceTags"
            label={videoList.form.audienceTags}
            options={useFetchList<ITagDto[]>({
              query: ListQueryConfig.TAG_LIST,
              keyName: { label: "name", value: "tagId" }
            })}
            placeholder={'カテゴリを選択'}
          />
          <UiFormSelect<TVideoListSchema>
            name="status"
            label={videoList.form.status}
            options={videoStatus}
            placeholder={videoList.form.status}
          />
        </div>

        {/* <label className="block text-sm font-medium text-gray-700 mb-2">
          {videoList.form.problemSetTitle}*
        </label>
        <UiFormSelect<TVideoListSchema>
          name="problemSetOne"
          label={videoList.form.problemSetOne}
          options={questionSet}
        />
        <UiFormSelect<TVideoListSchema>
          name="problemSetTwo"
          label={videoList.form.problemSetTwo}
          options={questionSet}
        />
        <UiFormSelect<TVideoListSchema>
          name="problemSetThree"
          label={videoList.form.problemSetThree}
          options={questionSet}
        />
        <UiFormSelect<TVideoListSchema>
          name="problemSetFour"
          label={videoList.form.problemSetFour}
          options={questionSet}
        />
        <p className="mt-2 text-sm text-gray-500">
          {videoList.form.problemSetFooter}
        </p> */}
        <UiFormSelect<TVideoListSchema>
          name="assignmentId"
          label={videoList.form.assignment}
          options={assignment}
          placeholder={videoList.form.assignment}
        />

        <VideoListFormUpload />

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            color="neutral"
            onClick={() => setIsOpen(false)}
          >
            {videoList.form.cancle}
          </Button>
          <Button type="submit"> {videoList.form.addVideo}</Button>
        </div>
      </div>
    </Fragment>
  );
}

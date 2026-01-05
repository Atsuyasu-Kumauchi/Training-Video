import { ListQueryConfig } from "@/common/apiEnpoint";
import { ITagDto } from "@/common/dto";
import { useFetchList } from "@/hooks";
import useLang from "@/lang";
import { Button, UiFormFileUpload, UiFormInput, UiFormSelect, UiFormSelect2, UiFormTextArea, UiFormYTUpload, useFormContext } from "@/tmsui";
import { useSettings } from "@/tmsui/store/settings";
import { UiFormRadio } from "@/tmsui/ui/UiFormRadio";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWatch } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";
import {
  assignment,
  TVideoListFormViewSchema,
  TVideoListSchema,
  videoStatus
} from "./videoList.form.type";

export default function VideoListFormView({ formRef, modalRef, isEdit }: TVideoListFormViewSchema) {
  const { setIsOpen } = useSettings();
  const { videoList } = useLang();
  const { formState: { errors }, control } = useFormContext<TVideoListSchema>();

  console.log("errors", errors);
  const videoFileType = useWatch({ control, name: "uploadType" });

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
              keyName: { label: "name", value: "name" }
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

        <div className="border-t border-b border-gray-200 py-4 my-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4"> {videoList.form.uploadTitle} </h4>
          <div className="space-y-4">
            <UiFormRadio<TVideoListSchema>
              name="uploadType"
              value="file"
              label={
                <span className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCloudUpload}
                    className="mr-2 text-sm"
                  />
                  {videoList.form.upVfile}
                </span>
              }
            />
            <UiFormRadio<TVideoListSchema>
              name="uploadType"
              value="youtube"
              label={
                <span className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faYoutube}
                    className="mr-2 text-red-600"
                  />
                  {videoList.form.upYoutube}
                </span>
              }
            />
          </div>
        </div>

        {videoFileType === "file" && <UiFormFileUpload<TVideoListSchema>
          name="fileResponse"
          title={videoList.form.upVTitle}
          label={videoList.form.upVSubTitle}
          description={videoList.form.upVFileUploaderTitle}
          placeholder={videoList.form.upVSubTitle}
        />}

        {videoFileType === "youtube" && <UiFormYTUpload<TVideoListSchema>
          name="fileResponse"
          title={videoList.form.upVTitle}
          label={videoList.form.upVSubTitle}
          description={videoList.form.upVFileUploaderTitle}
          placeholder={videoList.form.upVSubTitle}
        />}

        {/* <VideoListFormUpload /> */}

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

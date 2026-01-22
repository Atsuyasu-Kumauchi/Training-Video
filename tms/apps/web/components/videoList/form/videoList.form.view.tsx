"use client"
import { ListQueryConfig } from "@/common/apiEnpoint";
import { ITagDto } from "@/common/dto";
import { useFetchList } from "@/hooks";
import useLang from "@/lang";
import { Button, MediaServer, UiFormFileUpload, UiFormInput, UiFormSelect, UiFormSelect2, UiFormTextArea, UiFormYTUpload, useFormContext } from "@/tmsui";
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

export default function VideoListFormView({ modalRef, isEdit, isPending, editData }: TVideoListFormViewSchema) {
  const { videoList } = useLang();
  const { control, formState: { errors } } = useFormContext<TVideoListSchema>();
  const videoFileType = useWatch({ control, name: "uploadType" });
  console.log(errors);

  return (
    <Fragment>
      <div className="space-y-4">
        <UiFormInput<TVideoListSchema>
          name="name"
          label={videoList.form.videoTitle}
          required
        />
        <UiFormTextArea<TVideoListSchema>
          name="description"
          label={videoList.form.explanation}
          required
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
            required
          />
          <UiFormSelect<TVideoListSchema>
            name="status"
            label={videoList.form.status}
            options={videoStatus}
            placeholder={videoList.form.status}
            required
          />
        </div>

        <UiFormSelect<TVideoListSchema>
          name="assignmentId"
          label={videoList.form.assignment}
          options={assignment}
          placeholder={videoList.form.assignment}
          required
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

        {isEdit && <div id="editCurrentVideoThumbnail" className="bg-gray-50 rounded-lg p-4">
          <h5 className="text-sm font-medium text-gray-900 mb-2">現在の動画:</h5>
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            {editData?.uploadType === "youtube" ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${editData?.videoUrl}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : (
              <video
                className="w-full h-full object-cover"
                controls
                src={MediaServer(editData?.videoUrl as string)}
              />
            )}
          </div>
        </div>}

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            color="neutral"
            onClick={() => modalRef?.current?.modalClose()}
          >
            {videoList.form.cancle}
          </Button>
          <Button type="submit" disabled={isPending} loading={isPending}> {videoList.form.addVideo}</Button>
        </div>
      </div>
    </Fragment>
  );
}

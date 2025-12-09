import useLang from "@/lang";
import { Button, UiFormInput, UiFormSelect, UiFormTextArea } from "@/tmsui";
import { useSettings } from "@/tmsui/store/settings";
import { Fragment } from "react/jsx-runtime";
import {
  assignment,
  category,
  questionSet,
  status,
  TVideoListSchema,
} from "./videoList.form.type";
import VideoListFormUpload from "./videoList.form.upload";

export default function VideoListFormView() {
  const { setIsOpen } = useSettings();
  const { videoList } = useLang();

  return (
    <Fragment>
      <div className="px-6 py-8">
        <div className="space-y-4">
          <UiFormInput<TVideoListSchema>
            name="title"
            label={videoList.form.videoTitle}
            placeholder=""
          />
          <UiFormTextArea<TVideoListSchema>
            name="explanation"
            label={videoList.form.explanation}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UiFormSelect<TVideoListSchema>
              name="category"
              label={videoList.form.category}
              options={category}
            />
            <UiFormSelect<TVideoListSchema>
              name="status"
              label={videoList.form.status}
              options={status}
            />
          </div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
          </p>
          <UiFormSelect<TVideoListSchema>
            name="assignment"
            label={videoList.form.assignment}
            options={assignment}
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
      </div>
    </Fragment>
  );
}

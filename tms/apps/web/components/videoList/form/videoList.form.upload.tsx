import useLang from "@/lang";
import { UiFormInput, useFormContext } from "@/tmsui";
import { UiFormRadio } from "@/tmsui/ui/UiFormRadio";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWatch } from "react-hook-form";
import { TVideoListSchema } from "./videoList.form.type";

export default function VideoListFormUpload() {
  const { control } = useFormContext<TVideoListSchema>();
  const { videoList } = useLang();

  const selectedMode = useWatch({ control, name: "uploadType" });
  const youtubeUrl = useWatch({ control, name: "videoUrl" });

  // Extract videoId from YouTube URL
  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return "";
    const regExp =
      /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[1] ? `https://www.youtube.com/embed/${match[1]}` : "";
  };

  return (
    <>
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">
          {videoList.form.uploadTitle}
        </h4>
        <div className="space-y-4">
          <UiFormRadio
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
          <UiFormRadio
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

      {selectedMode === "file" && (
        <div className="border-t border-b border-gray-200 pt-6 pb-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            {videoList.form.upVTitle}
          </h4>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="videoFile"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {videoList.form.upVSubTitle} *
              </label>
              <input
                type="file"
                id="videoFile"
                name="videoFile"
                accept="video/*"
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                {videoList.form.upVFileUploaderTitle}
              </p>
            </div>
            {/* File Preview */}
            <div id="filePreview" className="bg-gray-50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-900 mb-2">
                {videoList.form.fileInformation}:
              </h5>
              <div className="space-y-2 text-sm text-gray-600">
                <div>
                  <strong>{videoList.form.name}:</strong> <span id="fileName" />
                </div>
                <div>
                  <strong>{videoList.form.size}:</strong> <span id="fileSize" />
                </div>
                <div>
                  <strong>{videoList.form.type}:</strong> <span id="fileType" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedMode === "youtube" && (
        <div className=" border-t border-b border-gray-200 pt-6 pb-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            {videoList.form.upYoutubeTitle}
          </h4>
          <div className="space-y-4">
            <UiFormInput<TVideoListSchema>
              name="videoUrl"
              label={videoList.form.upYoutubeSubTitle}
              placeholder="https://www.youtube.com/watch?v=..."
            />
            <p className="mt-1 text-sm text-gray-500">
              {videoList.form.upYoutubeFooter}
            </p>

            {youtubeUrl && getYouTubeEmbedUrl(youtubeUrl) && (
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-2">
                  {videoList.form.videoPreview}:
                </h5>
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src={getYouTubeEmbedUrl(youtubeUrl)}
                    className="w-full h-full"
                    frameBorder={0}
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

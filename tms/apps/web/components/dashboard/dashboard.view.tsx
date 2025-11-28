import useLang from "@/lang";
import { Button, humanTime, Modal, UiFormCheckbox, UiFormFiledArray, UiFormInput, UiFormSelect, UiFormTextArea, useFormContext } from "@/tmsui";
import { UiFormSelect2 } from "@/tmsui/ui/UiFormSelect2";
import {
  faBook,
  faClipboardCheck,
  faGraduationCap,
  faPlusCircle,
  faUser,
  faUserPlus,
  faUsers,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useState } from "react";
import { TDashboardSchema } from "./dashboard.type";

export default function DashboardView() {
  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext<TDashboardSchema>();
  const [isOpen, setIsOpen] = useState(false);
  const [now] = useState(() => Date.now());

  const humanTimeFromHoursAgo = (hoursAgo: number): string =>
    humanTime(new Date(now - hoursAgo * 60 * 60 * 1000));

  const lang = useLang();

  const data = [
    { label: "Name", value: "value" },
    { label: "Name 1", value: "value1" },
    { label: "Name 2", value: "value2" },
  ]

  return (
    <div className="px-6 py-8">
      <div className="space-y-4 mb-8">
        <div className="space-y-4">
          <UiFormInput<TDashboardSchema> name="name" label="Name" placeholder="Enter your text here.." />
          <UiFormSelect2<TDashboardSchema> name="tag" options={data} />
          <UiFormSelect<TDashboardSchema> name="department" label="Department" options={data} />
          <UiFormTextArea<TDashboardSchema> name="textarea" label="Textarea" />
          <UiFormCheckbox<TDashboardSchema> name="checkbox" label="Checkbox" />
          <UiFormFiledArray<TDashboardSchema> name="filedArray">
            {({ append, fields, remove }) => (
              <Fragment>
                {fields.map((item, index) => {
                  return (
                    <div key={item.id}>
                      <UiFormInput<TDashboardSchema> name={`filedArray.${index}.label`} label="Label" placeholder="Enter your text here.." />
                      <UiFormInput<TDashboardSchema> name={`filedArray.${index}.value`} label="Value" placeholder="Enter your text here.." />
                      <Button variant="gradient" color="danger" onClick={() => remove(index)} >Remove</Button>
                    </div>
                  )
                })}
                <Button
                  onClick={() => append({ label: "", value: "" })}
                >Append</Button>
              </Fragment>
            )}
          </UiFormFiledArray>
          <div>
            <Button type="submit" >Submit</Button>
          </div>
        </div>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Dashboard"

        >
          <div>
            Hello
          </div>
        </Modal>
        <div>
          <Button onClick={() => setIsOpen(true)} >Open Modal</Button>
        </div>

      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{lang.dashboard.dashboard}</h1>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faUser}
                  className=" text-white text-sm"
                />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{lang.dashboard.totalNumberOfUsers}</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
          </div>
        </div>
        {/* Active Trainings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faBook}
                  className=" text-white text-sm"
                />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                {lang.dashboard.activeTraining}
              </p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>
        {/* Total Videos */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faVideo}
                  className="fas fa-video text-white text-sm"
                />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{lang.dashboard.totalNumberOfVideos}</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {lang.dashboard.recentActivity}
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      className="fas fa-user-plus text-green-600 text-sm"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {lang.dashboard.newUserRegistered}
                  </p>
                  <p className="text-sm text-gray-500">
                    {lang.dashboard.sarahWilsonJoinedThePlatform}
                  </p>
                  <p className="text-xs text-gray-400">
                    {humanTimeFromHoursAgo(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faGraduationCap}
                      className="fas fa-graduation-cap text-blue-600 text-sm"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {lang.dashboard.trainingCompleted}
                  </p>
                  <p className="text-sm text-gray-500">
                    {lang.dashboard.johnDoeHasCompleted}
                  </p>
                  <p className="text-xs text-gray-400">{humanTimeFromHoursAgo(4)}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faVideo}
                      className="fas fa-video text-purple-600 text-sm"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {lang.dashboard.newVideoUploaded}
                  </p>
                  <p className="text-sm text-gray-500">
                    {lang.dashboard.reactHooksTutorialAddedToLibrary}
                  </p>
                  <p className="text-xs text-gray-400">{humanTimeFromHoursAgo(6)}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faClipboardCheck}
                      className="fas fa-clipboard-check text-yellow-600 text-sm"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {lang.dashboard.testCreated}
                  </p>
                  <p className="text-sm text-gray-500">
                    {lang.dashboard.advancedJavaScriptQuizCreated}
                  </p>
                  <p className="text-xs text-gray-400">{humanTimeFromHoursAgo(24)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{lang.dashboard.quickActions}</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-3">
              <a
                href="users.html"
                className="flex items-center p-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <FontAwesomeIcon
                  icon={faUsers}
                  className="fas fa-users w-5 h-5 mr-3 text-primary-600"
                />
                {lang.dashboard.manageTags}
              </a>
              <a
                href="video-list.html"
                className="flex items-center p-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <FontAwesomeIcon
                  icon={faVideo}
                  className="fas fa-video w-5 h-5 mr-3 text-primary-600"
                />
                {lang.dashboard.manageVideos}
              </a>
              <a
                href="training-list.html"
                className="flex items-center p-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <FontAwesomeIcon
                  icon={faBook}
                  className="fas fa-book w-5 h-5 mr-3 text-primary-600"
                />
                {lang.dashboard.manageYourTraining}
              </a>
              <a
                href="create-test.html"
                className="flex items-center p-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <FontAwesomeIcon
                  icon={faClipboardCheck}
                  className="fas fa-clipboard-check w-5 h-5 mr-3 text-primary-600"
                />
                {lang.dashboard.createATest}
              </a>
              <a
                href="add-test.html"
                className="flex items-center p-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  className="fas fa-plus-circle w-5 h-5 mr-3 text-primary-600"
                />
                {lang.dashboard.addANewTest}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

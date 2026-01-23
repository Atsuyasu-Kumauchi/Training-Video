import { useLang } from "@/lang";
import {
  Button,
  UiFormFiledArray,
  UiFormInput,
  UiFormSelect,
  UiFormTextArea,
} from "@/tmsui";
import { UiFormRadio } from "@/tmsui/ui/UiFormRadio";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { Fragment } from "react/jsx-runtime";
import {
  status,
  TCreateTestFormViewSchema,
  TCreateTestSchema,
} from "./createTest.form.type";

export default function EditTestFormView(props: TCreateTestFormViewSchema) {
  const { testCreation } = useLang();
  const router = useRouter();
  return (
    <>
      <div className="px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900" id="pageTitle">
              {testCreation.form.editTitle}
            </h2>
            <p className="text-gray-600 mt-1" id="pageDescription">
              {testCreation.form.editsubTitle}
            </p>
          </div>
        </div>
        {/* Test Creation Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {testCreation.form.testInformation}
            </h3>
          </div>
          <div id="testForm" className="p-6 space-y-6">
            {/* Basic Test Details */}
            <div className="grid grid-cols-12  gap-6">
              <div className="col-span-12 md:col-span-6">
                <UiFormInput<TCreateTestSchema>
                  name="name"
                  label={testCreation.form.testName}
                  placeholder={testCreation.form.testNamePlaceholder}
                  required
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <UiFormSelect<TCreateTestSchema>
                  name="status"
                  label={testCreation.form.status}
                  options={status}
                  required
                  placeholder={testCreation.form.statusPlaceholder}
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <UiFormTextArea<TCreateTestSchema>
                  name="description"
                  label={testCreation.form.explanation}
                  placeholder={testCreation.form.explanationPlaceholder}
                  required
                />
              </div>
            </div>
            {/* Questions Section */}
            <div className="border-t border-gray-200 pt-6">
              <UiFormFiledArray<TCreateTestSchema> name="testQuestions">
                {({ append, fields, remove }) => {
                  return (
                    <Fragment>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-medium text-gray-900">
                          {testCreation.form.questionHeader}
                        </h4>
                        <Button
                          type="button"
                          onClick={() =>
                            append({
                              question: "",
                              options: ["", "", "", ""],
                              correctOption: "A",
                            })
                          }
                        >
                          <FontAwesomeIcon
                            icon={faPlus}
                            className="fas fa-plus w-5 h-5 mr-2 text-white"
                          />
                          <span>{testCreation.form.addQuestion}</span>
                        </Button>
                      </div>

                      <div id="questionsContainer" className="space-y-4">
                        {fields.map((item, parentIndex) => {
                          return (
                            <div
                              key={item.id + parentIndex}
                              className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <h5 className="text-md font-medium text-gray-900">
                                  {" "}
                                  {testCreation.form.questionNo}{" "}
                                  {parentIndex + 1}{" "}
                                </h5>
                                <Button
                                  type="button"
                                  color="danger"
                                  variant="ghost"
                                  onClick={() => remove(parentIndex)}
                                  disabled={fields.length === 1}
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="fas fa-trash w-5 h-5"
                                  />
                                </Button>
                              </div>

                              {/* Question Text */}
                              <div>
                                <UiFormTextArea<TCreateTestSchema>
                                  name={`testQuestions.${parentIndex}.question`}
                                  label={testCreation.form.question}
                                  placeholder={
                                    testCreation.form.questionPlaceholder
                                  }
                                  required
                                />
                              </div>

                              {/* Options */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  {testCreation.form.choices}
                                </label>

                                <div className="space-y-2">
                                  {item?.options?.map((opt, childIndex) => {
                                    return (
                                      <div
                                        key={parentIndex + childIndex}
                                        className="flex items-center space-x-2"
                                      >
                                        <UiFormRadio
                                          name={`testQuestions.${parentIndex}.correctOption`}
                                          value={childIndex + 1}
                                        />
                                        <div className="w-full">
                                          <UiFormInput
                                            name={`testQuestions.${parentIndex}.options.${childIndex}`}
                                            placeholder={`${testCreation.form.option} ${opt}`}
                                            required
                                            className="flex-1 min-w-0"
                                          />
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </Fragment>
                  );
                }}
              </UiFormFiledArray>
            </div>
            {/* Form Actions */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  color="neutral"
                  onClick={() => router.push("/admin/create-test")}
                >
                  {testCreation.form.cancel}
                </Button>
                <Button type="submit">{testCreation.form.updateTest}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

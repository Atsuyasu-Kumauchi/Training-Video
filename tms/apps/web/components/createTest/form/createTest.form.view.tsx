import {
  Button,
  UiFormFiledArray,
  UiFormInput,
  UiFormSelect,
  UiFormTextArea
} from "@/tmsui";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react/jsx-runtime";
import { TCreateTestSchema } from "./createTest.form.type";

export default function CreateTestFormView() {
  return (
    <>
      <div className="px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900" id="pageTitle">新規テスト追加</h2>
            <p className="text-gray-600 mt-1" id="pageDescription">質問と設定を含む新しいテストを作成</p>
          </div>
        </div>
        {/* Test Creation Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">テスト情報</h3>
          </div>
          <div id="testForm" className="p-6 space-y-6">
            {/* Basic Test Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <UiFormInput<TCreateTestSchema> name="name" label="テスト名" placeholder="テスト名を入力" required />
              </div>
              <div>
                <UiFormSelect<TCreateTestSchema> name="category" label="カテゴリ" placeholder="カテゴリを選択" options={[
                  { value: "Programming", label: "プログラミング" },
                  { value: "Leadership", label: "リーダーシップ" },
                  { value: "Safety", label: "安全" },
                  { value: "Communication", label: "コミュニケーション" },
                  { value: "Compliance", label: "コンプライアンス" },
                ]} required />
              </div>
              <div><UiFormTextArea<TCreateTestSchema> name="explanation" label="説明" placeholder="テストの説明を入力" required />
              </div>
              <div>
                <UiFormSelect<TCreateTestSchema> name="status" label="ステータス" placeholder="ステータスを選択" options={[
                  { value: "Active", label: "アクティブ" },
                  { value: "Draft", label: "下書き" },
                  { value: "Archived", label: "アーカイブ済み" },
                ]} required />
              </div>
            </div>
            {/* Questions Section */}
            <div className="border-t border-gray-200 pt-6">
              <UiFormFiledArray<TCreateTestSchema> name="questions">
                {({ append, fields, remove }) => (
                  <Fragment>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-gray-900">質問</h4>
                      <Button type="button" onClick={() => append({ questionText: "", questionType: "" })} >
                        <FontAwesomeIcon icon={faPlus} className="fas fa-plus w-5 h-5 mr-2 text-white" />
                        <span>質問を追加</span>
                      </Button>
                    </div>
                    <div id="questionsContainer" className="space-y-4">
                      {fields.map((item, index) => (
                        <div key={item.id + index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="text-md font-medium text-gray-900">質問 {index + 1}</h5>
                            <Button type="button" color="danger" variant="ghost" onClick={() => remove(index)} disabled={fields.length === 1} >
                              <FontAwesomeIcon icon={faTrash} className="fas fa-trash w-5 h-5" />
                            </Button>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <UiFormTextArea<TCreateTestSchema> name={`questions.${index}.questionText`} label="質問文" placeholder="質問文を入力" required />
                            </div>
                            <div>
                              <UiFormSelect<TCreateTestSchema> name={`questions.${index}.questionType`} label="質問タイプ" placeholder="質問タイプを選択" options={[
                                { value: "Multiple Choice", label: "複数選択" },
                                { value: "Single Choice", label: "単一選択" },
                                { value: "Free Text", label: "自由回答" },
                              ]} required />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Fragment>
                )}


              </UiFormFiledArray>
            </div>
            {/* Form Actions */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-end space-x-3">
                <Button type="button" color="neutral">
                  キャンセル
                </Button>
                <Button type="submit">
                  テストを作成
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

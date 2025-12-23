import useLang from "@/lang";
import { Button, UiFormCheckbox, UiFormInput, UiFormSelect } from "@/tmsui";
import { UiFormSelect2 } from "@/tmsui/ui/UiFormSelect2";
import { department, role, tag, TUserSchema } from "./user.form.type";

export default function UserFormView() {
  const { user } = useLang();
  return (
    <>
      <div className="px-6 py-8">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UiFormInput<TUserSchema>
              name="lastName"
              label={user.form.lastName}
              placeholder=""
            />
            <UiFormInput<TUserSchema>
              name="givenName"
              label={user.form.givenName}
              placeholder=""
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UiFormInput<TUserSchema>
              name="email"
              label={user.form.email}
              placeholder=""
            />
            <UiFormInput<TUserSchema>
              name="employeeId"
              label={user.form.employeeId}
              placeholder=""
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UiFormSelect<TUserSchema>
              name="department"
              label={user.form.department}
              options={department}
            />
            <UiFormSelect<TUserSchema>
              name="role"
              label={user.form.role}
              options={role}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UiFormInput<TUserSchema>
              name="dateOfHire"
              label={user.form.dateOfHire}
              placeholder=""
            />
            <UiFormSelect2<TUserSchema>
              label={user.form.tag}
              name="tag"
              options={tag}
            />
          </div>
          <div className="grid grid-cols-1  gap-4">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              {user.form.issueReview}
            </h4>
            <UiFormSelect<TUserSchema>
              name="firstReview"
              label={user.form.firstReview}
              options={department}
            />
            <UiFormSelect<TUserSchema>
              name="secondReview"
              label={user.form.secondaryReview}
              options={department}
            />
            <UiFormSelect<TUserSchema>
              name="finalReview"
              label={user.form.finalReview}
              options={department}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {user.form.adminisPrivileges}
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-3">
                <UiFormCheckbox<TUserSchema>
                  name="checkbox"
                  label="ダッシュボードアクセス"
                />{" "}
                {/* Dashboard Access */}
                <UiFormCheckbox<TUserSchema>
                  name="checkbox"
                  label="ユーザー一覧管理"
                />
                {/* User list management */}
                <UiFormCheckbox<TUserSchema>
                  name="checkbox"
                  label="ユーザーグループ管理"
                />
                {/* User Group Management */}
                <UiFormCheckbox<TUserSchema>
                  name="checkbox"
                  label="動画一覧管理"
                />
                {/* Video list management */}
              </div>

              <p className="text-xs text-gray-500 mt-1">
                {user.form.adminisPrivilegesFooter}
              </p>
            </div>

            <div>
              <UiFormInput<TUserSchema>
                name="password"
                label={user.form.passSetting}
                placeholder={user.form.passSetting}
              />
              <p className="text-xs text-gray-500 mt-1">
                {user.form.passSettingPlaceholder}
              </p>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" color="neutral">
              {user.form.cancel}
            </Button>
            <Button type="submit"> {user.form.addAUser}</Button>
          </div>
        </div>
      </div>
    </>
  );
}

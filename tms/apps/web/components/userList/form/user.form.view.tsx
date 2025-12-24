import { IDepartmentDto, IRoleDto, ITagDto, ListQueryConfig } from "@/common";
import { useFetchList } from "@/hooks";
import useLang from "@/lang";
import { Button, passwordGenerate, UiFormInput, UiFormSelect, useFormContext } from "@/tmsui";
import { UiFormSelect2 } from "@/tmsui/ui/UiFormSelect2";
import { TUserFormViewSchema, TUserSchema } from "./user.form.type";

export default function UserFormView({ modalRef, isPending }: TUserFormViewSchema) {
  const { user } = useLang();
  const { setValue, trigger } = useFormContext<TUserSchema>();

  const generatePassword = () => {
    const password = passwordGenerate()
    setValue("password", password);
    trigger("password");
  }
  return (
    <>
      <div className="grid grid-cols-12 gap-4">

        <div className="col-span-12 md:col-span-6">
          <UiFormInput<TUserSchema>
            name="lastName"
            label={user.form.lastName}
            placeholder=""
            required
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <UiFormInput<TUserSchema>
            name="firstName"
            label={user.form.givenName}
            placeholder=""
            required
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <UiFormInput<TUserSchema>
            name="email"
            label={user.form.email}
            placeholder=""
            required
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <UiFormInput<TUserSchema>
            name="employeeId"
            label={user.form.employeeId}
            placeholder=""
            required
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <UiFormSelect<TUserSchema>
            name="departmentId"
            label={user.form.department}
            options={useFetchList<IDepartmentDto[]>({
              query: ListQueryConfig.DEPARTMENT_LIST,
              keyName: { label: "name", value: "departmentId" }
            })}
            placeholder={user.form.departmentPlaceholder}
            required
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <UiFormSelect<TUserSchema>
            name="roleId"
            label={user.form.role}
            options={useFetchList<IRoleDto[]>({
              query: ListQueryConfig.ROLE_LIST,
              keyName: { label: "name", value: "roleId" }
            })}
            placeholder={user.form.rolePlaceholder}
            required
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <UiFormInput<TUserSchema>
            name="joinDate"
            label={user.form.dateOfHire}
            placeholder=""
            required
            type="date"
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <UiFormSelect2<TUserSchema>
            label={user.form.tag}
            name="userTags"
            isMulti
            options={useFetchList<ITagDto[]>({
              query: ListQueryConfig.TAG_LIST,
              keyName: { label: "name", value: "tagId" }
            })}
          />
        </div>
        {/* 
        <div className="col-span-12">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            {user.form.issueReview}
          </h4>
        </div>
        <div className="col-span-12">
          <UiFormSelect<TUserSchema>
            name="firstReview"
            label={user.form.firstReview}
            options={department}
          />
        </div>
        <div className="col-span-12">
          <UiFormSelect<TUserSchema>
            name="secondReview"
            label={user.form.secondaryReview}
            options={department}
          />
        </div>
        <div className="col-span-12">
          <UiFormSelect<TUserSchema>
            name="finalReview"
            label={user.form.finalReview}
            options={department}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {user.form.adminisPrivileges}
            </label>
            <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-3">
              <UiFormCheckbox<TUserSchema>
                name="checkbox"
                label="ダッシュボードアクセス"
              />
              <UiFormCheckbox<TUserSchema>
                name="checkbox"
                label="ユーザー一覧管理"
              />
              <UiFormCheckbox<TUserSchema>
                name="checkbox"
                label="ユーザーグループ管理"
              />
              <UiFormCheckbox<TUserSchema>
                name="checkbox"
                label="動画一覧管理"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {user.form.adminisPrivilegesFooter}
            </p>
          </div>

        </div>
        <div className="col-span-12 md:col-span-6">
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
        </div> */}
        <div className="col-span-12">
          <UiFormInput<TUserSchema>
            name="password"
            label={user.form.passSetting}
            placeholder={user.form.passSettingPlaceholder}
            endIcon={<div className=" text-blue-500 hover:text-blue-700 font-medium cursor-pointer" onClick={generatePassword}>{user.form.generatePassword}</div>}
          />
        </div>


        <div className="col-span-12 flex justify-end space-x-3">
          <Button type="button" color="neutral" onClick={() => modalRef?.current?.modalClose()}>
            {user.form.cancel}
          </Button>
          <Button type="submit" disabled={isPending} loading={isPending}> {user.form.addAUser}</Button>
        </div>
      </div>
    </>
  );
}


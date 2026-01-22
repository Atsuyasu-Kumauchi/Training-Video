export class Messages {
  // General CRUD messages
  static readonly NOT_FOUND = (subject: string) => `${subject}が見つかりません。`; // ${subject} not found
  static readonly DUPLICAT_ENTRY = (subject: string) => `${subject}は既に存在します。`; // ${subject} exists
  static readonly FAILED_CREATE = (subject: string) => `${subject}の作成に失敗しました。`; // Failed to create ${subject}
  static readonly FAILED_UPDATE = (subject: string) => `${subject}の更新に失敗しました。`; // Failed to update ${subject}
  static readonly FAILED_DELETE = (subject: string) => `${subject}の削除に失敗しました。`; // Failed to delete ${subject}

  // Department validation messages
  static readonly MSG1 = '部門名は文字列である必要があります。'; // Department name must be a string
  static readonly MSG1_EX = (module: string, field: string, typename: string) => `${module}の${field}は${typename}である必要があります。`; // ${module} ${field} must be a ${typename}
  static readonly MSG2 = '部門名は必須です。'; // Department name is required
  static readonly MSG2_EX = (module: string, field: string) => `${module}の${field}は必須です。`; // ${module} ${field} is required
  static readonly MSG3 = '部門名は少なくとも2文字である必要があります。'; // Department name must be at least 2 characters long
  static readonly MSG4 = '部門名は100文字を超えることはできません。'; // Department name cannot exceed 100 characters
  static readonly MSG5 = '部門名には、文字、数字、スペース、ハイフン、アンダースコアのみを含めることができます。'; // Department name can only contain letters, numbers, spaces, hyphens, and underscores

  // Department business logic messages
  static readonly MSG6 = 'この名前の部門は既に存在します。'; // Department with this name already exists
  static readonly MSG7 = '部門が正常に作成されました。'; // Department created successfully
  static readonly MSG8 = '部門が正常に更新されました。'; // Department updated successfully
  static readonly MSG9 = '部門が正常に削除されました。'; // Department deleted successfully

  // Department error messages
  static readonly MSG10 = '部門が見つかりません。'; // Department not found
  static readonly MSG10_EX = (module: string) => `${module}が見つかりません。`; // ${module} not found
  static readonly MSG11 = '部門の作成に失敗しました。'; // Failed to create department
  static readonly MSG12 = '部門の更新に失敗しました。'; // Failed to update department
  static readonly MSG13 = '部門の削除に失敗しました。'; // Failed to delete department

  // General validation messages
  static readonly MSG14 = '無効な入力データです。'; // Invalid input data
  static readonly MSG15 = 'フィールドは必須です。'; // Field is required
  static readonly MSG16 = 'フィールドは有効なメールアドレスである必要があります。'; // Field must be a valid email
  static readonly MSG17 = 'フィールドは有効な数値である必要があります。'; // Field must be a valid number

  // Success messages
  static readonly MSG18 = '操作が正常に完了しました。'; // Operation completed successfully
  static readonly MSG19 = 'データが正常に取得されました。'; // Data retrieved successfully
  static readonly MSG20 = 'データが見つかりません。'; // No data found

  // Tag validation messages
  static readonly MSG21 = 'このタグは既に存在します。'; // Tag already exists
  static readonly MSG22 = 'タグ名にスペースは使用できません。アンダースコア（_）を使用してください。'; // Tag name cannot contain spaces, use underscore instead
  static readonly MSG23 = 'タグ名は20文字以内である必要があります。'; // Tag name must be 20 characters or less
}

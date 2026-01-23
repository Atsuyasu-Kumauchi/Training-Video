export class Messages {
  // General validation messages (Japanese)
  static readonly FIELD_REQUIRED = 'このフィールドは必須です。'; // This field is required
  static readonly INVALID_EMAIL = '有効なメールアドレスを入力してください。'; // Field must be a valid email
  static readonly INVALID_URL = '有効なURL形式を入力してください（例: https://example.com）。'; // Invalid URL format
  static readonly INVALID_NUMBER = '有効な数値を入力してください。'; // Field must be a valid number
  static readonly INVALID_INPUT = '無効な入力データです。'; // Invalid input data

  // Error messages (Japanese)
  static readonly ERROR_OCCURRED = 'エラーが発生しました。'; // Error occurred
  static readonly OPERATION_FAILED = '操作に失敗しました。'; // Operation failed
  static readonly DATA_NOT_FOUND = 'データが見つかりません。'; // Data not found

  // Success messages (Japanese)
  static readonly OPERATION_SUCCESS = '操作が正常に完了しました。'; // Operation completed successfully
  static readonly DATA_RETRIEVED = 'データが正常に取得されました。'; // Data retrieved successfully

  // Tag validation messages (Japanese)
  static readonly TAG_ALREADY_EXISTS = 'このタグは既に存在します。'; // Tag already exists
  static readonly TAG_NO_SPACES = 'タグ名にスペースは使用できません。アンダースコア（_）を使用してください。'; // Tag name cannot contain spaces, use underscore instead
  static readonly TAG_MAX_LENGTH = 'タグ名は20文字以内である必要があります。'; // Tag name must be 20 characters or less

  // Auth validation messages (Japanese)
  static readonly LOGIN_FAILED = 'メールアドレスまたはパスワードが正しくありません。'; // Invalid credentials
}

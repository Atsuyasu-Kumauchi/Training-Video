export class Messages {
  // General CRUD messages
  static readonly NOT_FOUND = (subject: string) => `${subject} not found`;
  static readonly DUPLICAT_ENTRY = (subject: string) => `${subject} exists`;
  static readonly FAILED_CREATE = (subject: string) => `Failed to create ${subject}`;
  static readonly FAILED_UPDATE = (subject: string) => `Failed to update ${subject}`;
  static readonly FAILED_DELETE = (subject: string) => `Failed to delete ${subject}`;

  // Department validation messages
  static readonly MSG1 = 'Department name must be a string';
  static readonly MSG1_EX = typename => `Department name must be a ${typename}`;
  static readonly MSG2 = 'Department name is required';
  static readonly MSG3 = 'Department name must be at least 2 characters long';
  static readonly MSG4 = 'Department name cannot exceed 100 characters';
  static readonly MSG5 = 'Department name can only contain letters, numbers, spaces, hyphens, and underscores';

  // Department business logic messages
  static readonly MSG6 = 'Department with this name already exists';
  static readonly MSG7 = 'Department created successfully';
  static readonly MSG8 = 'Department updated successfully';
  static readonly MSG9 = 'Department deleted successfully';

  // Department error messages
  static readonly MSG10 = 'Department not found';
  static readonly MSG11 = 'Failed to create department';
  static readonly MSG12 = 'Failed to update department';
  static readonly MSG13 = 'Failed to delete department';

  // General validation messages
  static readonly MSG14 = 'Invalid input data';
  static readonly MSG15 = 'Field is required';
  static readonly MSG16 = 'Field must be a valid email';
  static readonly MSG17 = 'Field must be a valid number';

  // Success messages
  static readonly MSG18 = 'Operation completed successfully';
  static readonly MSG19 = 'Data retrieved successfully';
  static readonly MSG20 = 'No data found';
}

import { IsString, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';
import { Messages } from 'src/common/constants';


export class CreateDepartmentDto {
  @IsString({ message: Messages.MSG1 })
  @IsNotEmpty({ message: Messages.MSG2 })
  @MinLength(2, { message: Messages.MSG3 })
  @MaxLength(100, { message: Messages.MSG4 })
  @Matches(/^[a-zA-Z0-9\s\-_]+$/, {
    message: Messages.MSG5
  })
  name: string;
}

export class DepartmentDto {
  departmentId: number;
  name: string;
  status: boolean;
  created: Date;
  modified: Date;
}

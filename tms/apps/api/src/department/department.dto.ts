import { Transform, Type } from 'class-transformer';
import { IsString, IsNotEmpty, MinLength, MaxLength, Matches, IsBoolean, IsOptional, IsEnum, IsNumber, IsPositive, Min } from 'class-validator';
import { Messages } from 'src/common/constants';
import { SortDirection } from 'src/common/enums/SortDirection';


export class CreateDepartmentDto {
  @IsString({ message: Messages.MSG1 })
  @IsNotEmpty({ message: Messages.MSG2 })
  @MinLength(2, { message: Messages.MSG3 })
  @MaxLength(100, { message: Messages.MSG4 })
  @Matches(/^[a-zA-Z0-9\s\-_]+$/, {
    message: Messages.MSG5
  })
  name: string;

  @IsBoolean({ message: Messages.MSG1_EX('Department', 'status', 'boolean')})
  @IsNotEmpty({ message: Messages.MSG2_EX('Department', 'status') })
  status: boolean;
}

export class DepartmentQueryDto {
  @IsOptional()
  @IsString()
  nameFilter?: string;

  @Transform(arg => arg.value === 'true')
  @IsBoolean()
  statusFilter: boolean = true;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  pageIndex: number = 0;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  pageSize: number = 10;

  @Type(() => Number)
  @IsNumber()
  sortBy: string = "Department.departmentId".split(".")[1];

  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection: SortDirection = SortDirection.Descending;
}

import { Transform, Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";
import { Messages } from "src/common/constants";
import { SortDirection } from "src/common/enums/SortDirection";


export class CreateAssignmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsBoolean({ message: Messages.MSG1_EX('Assignment', 'status', 'boolean') })
  @IsNotEmpty({ message: Messages.MSG2_EX('Assignment', 'status') })
  status: boolean;

  @IsNotEmpty()
  question: string;

  @IsNumber()
  correctOption: number;

  @IsNumber({}, { each: true })
  options: number[];
}

export class AssignmentQueryDto {
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

  @IsString()
  sortBy: string = "Assignment.assignmentId".split(".")[1];

  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection: SortDirection = SortDirection.Descending;
}

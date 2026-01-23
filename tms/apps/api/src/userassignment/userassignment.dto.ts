import { Transform, Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";
import { Messages } from "src/common/constants";
import { SortDirection } from "src/common/enums/SortDirection";


export class CreateAssignmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  question: string;
}

export class AssignmentQueryDto {
  @IsOptional()
  @IsString()
  nameFilter?: string;

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

export class UserAssignmentQueryDto {
  @IsOptional()
  @IsString()
  nameFilter?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  pageIndex: number = 0;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  pageSize: number = 10;

  @IsString()
  sortBy: string = "UserAssignment.userAssignmentId".split(".")[1];

  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection: SortDirection = SortDirection.Descending;
}

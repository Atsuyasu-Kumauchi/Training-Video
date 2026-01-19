import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsStrongPassword, Matches, MaxLength, Min, MinLength } from "class-validator";
import { SortDirection } from "src/common/enums/SortDirection";


export class CreateUserDto {

  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @IsArray()
  userTagIds: number[];

  @IsNotEmpty()
  @IsNumber()
  roleId: number;

  @IsNotEmpty()
  @IsNumber()
  departmentId: number;

  @IsNotEmpty()
  employeeId: string;

  @IsNotEmpty()
  joinDate: Date;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @IsArray()
  reviewers: any[];

}

export class UserQueryDto {
  @IsOptional()
  @IsString()
  simplenameFilter?: string;

  @Transform(arg => arg.value === 'true')
  @IsBoolean()
  @IsOptional()
  statusFilter?: boolean;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  departmentIdFilter?: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  pageIndex: number = 0;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  pageSize: number = 10;

  @IsString()
  sortBy: string = "User.userId".split(".")[1];

  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection: SortDirection = SortDirection.Descending;
}

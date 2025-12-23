import { Type } from "class-transformer";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsStrongPassword, Matches, MaxLength, Min, MinLength } from "class-validator";
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
    roleId: number;

    @IsNotEmpty()
    departmentId: number;

    @IsNotEmpty()
    employeeId: string;

    @IsNotEmpty()
    isReviewer: boolean = false;

}

export class UserQueryDto {
  @IsOptional()
  @IsString()
  simplenameFilter?: string;

  @Type(() => Boolean)
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
  sortBy: string = "User.userId".split(".")[1];

  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection: SortDirection = SortDirection.Descending;
}

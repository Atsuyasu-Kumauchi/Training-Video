import { Type } from "class-transformer";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsStrongPassword, Matches, MaxLength, Min, MinLength } from "class-validator";
import { SortDirection } from "src/common/enums/SortDirection";


export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(25)
    @Matches(/^[a-zA-Z0-9]+$/)
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

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

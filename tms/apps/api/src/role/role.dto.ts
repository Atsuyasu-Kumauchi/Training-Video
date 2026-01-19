import { Transform, Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";
import { Messages } from "src/common/constants";
import { SortDirection } from "src/common/enums/SortDirection";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsBoolean({ message: Messages.MSG1_EX('Role', 'status', 'boolean') })
    @IsNotEmpty({ message: Messages.MSG2_EX('Role', 'status') })
    status: boolean;
}

export class RoleQueryDto {
  @IsOptional()
  @IsString()
  nameFilter?: string;

  @Transform(arg => arg.value === 'true')
  @IsBoolean()
  @IsOptional()
  statusFilter?: boolean;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  pageIndex: number = 0;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  pageSize: number = 10;

  @IsString()
  sortBy: string = "Role.roleId".split(".")[1];

  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection: SortDirection = SortDirection.Descending;
}

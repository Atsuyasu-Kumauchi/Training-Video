import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";
import { Messages } from "src/common/constants";
import { SortDirection } from "src/common/enums/SortDirection";

export class CreateUserTrainingDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsArray()
    videos: number[] = [];

    @IsNotEmpty()
    deadline: Date;

    @IsBoolean({ message: Messages.MSG1_EX('UserTraining', 'status', 'boolean') })
    @IsNotEmpty({ message: Messages.MSG2_EX('UserTraining', 'status') })
    status: boolean;

    @IsArray()
    users: number[];
}

export class UserTrainingQueryDto {
  @IsOptional()
  @IsString()
  nameFilter?: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  userIdFilter?: number;

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
  sortBy: string = "UserTraining.userTrainingId".split(".")[1];

  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection: SortDirection = SortDirection.Descending;
}

import { Transform, Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";
import { Messages } from "src/common/constants";
import { SortDirection } from "src/common/enums/SortDirection";

export class CreateTrainingDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsBoolean({ message: Messages.MSG1_EX('Training', 'status', 'boolean') })
    @IsNotEmpty({ message: Messages.MSG2_EX('Training', 'status') })
    status: boolean;
}

export class TrainingQueryDto {
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
  sortBy: string = "Training.trainingId".split(".")[1];

  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection: SortDirection = SortDirection.Descending;
}

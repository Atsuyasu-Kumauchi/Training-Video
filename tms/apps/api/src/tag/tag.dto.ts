import { Transform, Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Matches, MaxLength, Min } from "class-validator";
import { Messages } from "src/common/constants";
import { SortDirection } from "src/common/enums/SortDirection";

export class CreateTagDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(20, { message: Messages.MSG23 }) // Tag name must be 20 characters or less
    @Matches(/^[^\s　]+$/, { message: Messages.MSG22 }) // Tag name cannot contain spaces (regular or Japanese full-width), use underscore instead
    name: string;

    @IsBoolean({ message: Messages.MSG1_EX('Tag', 'status', 'boolean') })
    @IsNotEmpty({ message: Messages.MSG2_EX('Tag', 'status') })
    status: boolean;
}

export class TagQueryDto {
  @IsOptional()
  @IsString()
  nameFilter?: string;

  @Transform(arg => arg.value === 'true')
  @IsBoolean()
  @IsOptional()
  statusFilter: boolean | null = null;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  pageIndex: number = 0;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  pageSize: number = 10;

  @IsString()
  sortBy: string = "Tag.tagId".split(".")[1];

  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection: SortDirection = SortDirection.Descending;
}

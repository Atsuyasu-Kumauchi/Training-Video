import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsIn, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";
import { Messages } from "src/common/constants";
import { SortDirection } from "src/common/enums/SortDirection";


export class CreateVideoDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    description?: string;

    @IsNumber()
    @IsNotEmpty()
    testId: number;

    @IsNumber()
    @IsNotEmpty()
    assignmentId: number;

    @IsIn(['youtube', 'file'])
    uploadType: 'youtube' | 'file';

    @IsNotEmpty()
    videoUrl: string;

    @IsNotEmpty()
    fileName: string;

    @IsOptional()
    fileDirectory: string;

    @IsNotEmpty()
    @IsString({ each: true })
    @IsArray()
    audienceTags: string[];

    @IsBoolean({ message: Messages.MSG1_EX('Role', 'status', 'boolean') })
    @IsNotEmpty({ message: Messages.MSG2_EX('Role', 'status') })
    status: boolean;
}

export class VideoQueryDto {
  @IsOptional()
  @IsString()
  nameFilter?: string;

  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  tagsFilter?: string[];

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
  sortBy: string = "Video.videoId".split(".")[1];

  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection: SortDirection = SortDirection.Descending;
}

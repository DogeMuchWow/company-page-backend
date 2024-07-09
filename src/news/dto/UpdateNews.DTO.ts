import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateNewsDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  summary?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  author?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  mode?: boolean;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  categories?: ObjectId[];

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  views?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  timepublic?: string;
}

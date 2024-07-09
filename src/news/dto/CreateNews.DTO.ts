import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateNewsDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  summary: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  mode: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsArray()
  tags: string[];

  @ApiProperty({ example: 'ObjectId' })
  @IsArray()
  @IsNotEmpty()
  @IsMongoId({ each: true })
  categories: ObjectId[];

  @ApiProperty()
  @IsArray()
  @IsNumber()
  views: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  timepublic: string;
}

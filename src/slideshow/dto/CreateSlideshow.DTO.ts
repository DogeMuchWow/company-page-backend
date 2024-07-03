import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateSlideshowDTO {
  @ApiProperty({
    example: 'Slideshow',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'ObjectId',
  })
  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  slides?: ObjectId[];

  @ApiProperty({
    example: 'autoplay',
  })
  @IsString()
  @IsNotEmpty()
  effect: string;

  @ApiProperty({
    example: 'true',
  })
  @IsBoolean()
  @IsNotEmpty()
  display: boolean;
}

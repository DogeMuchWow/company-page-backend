import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateSlideshowDTO {
  @ApiProperty({
    example: 'Slideshow',
  })
  @IsString()
  @IsOptional()
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
  @IsOptional()
  effect: string;

  @ApiProperty({
    example: 'true',
  })
  @IsBoolean()
  @IsOptional()
  display: boolean;
}

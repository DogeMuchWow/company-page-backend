import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateCategoryDTO {
  @ApiProperty({
    example: 'Blockchain',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  children?: ObjectId[];
}

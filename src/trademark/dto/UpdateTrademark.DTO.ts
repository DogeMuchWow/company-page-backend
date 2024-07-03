import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateTrademarkDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  copyright?: string;

  @ApiProperty({ example: 'ObjectId' })
  @IsMongoId({ each: true })
  @IsOptional()
  license?: ObjectId;

  @ApiProperty()
  @IsString()
  @IsOptional()
  favicon?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  logo?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  logoIcon?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  logoWord?: string;
}

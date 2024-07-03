import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateTrademarkDTO {
  @ApiProperty({ example: 'Trademark data' })
  @IsString()
  @IsNotEmpty()
  copyright: string;

  @ApiProperty({ example: 'ObjectId' })
  @IsMongoId({ each: true })
  @IsNotEmpty()
  license: ObjectId;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  favicon: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  logo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  logoIcon: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  logoWord: string;
}

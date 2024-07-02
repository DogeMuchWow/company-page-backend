import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateLicensesDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  text?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image?: string;
}

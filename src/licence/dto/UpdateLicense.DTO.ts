import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateLicensesDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  text?: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsString()
  @IsOptional()
  images?: string[];
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatelicensesDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsString()
  @IsOptional()
  images?: string[];
}

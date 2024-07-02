import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateContactTicketsDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  phone?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  email?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  message?: string;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  checked?: boolean;
}

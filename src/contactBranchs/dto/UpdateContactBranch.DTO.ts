import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateContactBranchsDTO {
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
  address?: string;
}

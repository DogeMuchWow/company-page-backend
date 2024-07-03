import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateContactBranchsDTO {
  @ApiProperty({ example: 'Nguyen Van A' })
  @IsString()
  @IsOptional()
  name?: string;
  @ApiProperty({ example: '0912345678' })
  @IsString()
  @IsOptional()
  phone?: string;
  @ApiProperty({ example: 'nguyenvana@testmail.com' })
  @IsString()
  @IsOptional()
  email?: string;
  @ApiProperty({ example: 'Test address' })
  @IsString()
  @IsOptional()
  address?: string;
}

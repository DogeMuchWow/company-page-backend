import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateContactTicketsDTO {
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
  @ApiProperty({ example: 'Test message' })
  @IsString()
  @IsOptional()
  message?: string;
  @ApiProperty({ example: 'false' })
  @IsBoolean()
  @IsOptional()
  checked?: boolean;
}

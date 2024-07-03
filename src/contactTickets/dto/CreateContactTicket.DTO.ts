import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateContactTicketsDTO {
  @ApiProperty({ example: 'Nguyen Van A' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ example: '0912345678' })
  @MaxLength(10)
  @IsString()
  @IsNotEmpty()
  phone: string;
  @ApiProperty({ example: 'nguyenvana@testmail.com' })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
  @ApiProperty({ example: 'Test message' })
  @IsString()
  @IsNotEmpty()
  message: string;
  @ApiProperty({ example: 'false' })
  @IsBoolean()
  @IsNotEmpty()
  checked: boolean;
}

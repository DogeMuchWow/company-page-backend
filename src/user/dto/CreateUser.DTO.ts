import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { UserRole } from './User.DTO';
import { Type } from 'class-transformer';

class fullnameDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastname: string;
}

export class CreateUserDTO {
  @ApiProperty()
  @ValidateNested()
  @Type(() => fullnameDTO)
  fullname: fullnameDTO;

  @ApiProperty({ example: false })
  @IsBoolean()
  block: boolean;

  @ApiProperty({ example: 'test@mail.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Minimum password length must be 8' })
  password: string;

  @ApiProperty()
  @IsArray()
  @IsEnum(UserRole, { each: true })
  @IsOptional()
  roles: UserRole[];

  @ApiProperty({ example: 'offline' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sex: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserRole } from './User.DTO';

class fullnameDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  firstname?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastname?: string;
}

export class UpdateUserDTO {
  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => fullnameDTO)
  fullname?: fullnameDTO;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  block?: boolean;

  @ApiProperty({ example: 'test@mail.com' })
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsEnum(UserRole, { each: true })
  roles?: UserRole[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  sex?: string;
}

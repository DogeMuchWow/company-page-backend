import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContactBranchsDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;
}

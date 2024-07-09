import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/CreateUser.DTO';
import { UserService } from './users.service';
import { UpdateUserDTO } from './dto/UpdateUser.DTO';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //Create new user
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create new user' })
  async CreateUser(@Body() createUserDTO: CreateUserDTO) {
    return await this.userService.createNewUser(createUserDTO);
  }

  //Get all user
  @Get()
  @ApiOperation({ summary: 'Get all user' })
  GetUser() {
    return this.userService.getUser();
  }

  //Get user by id
  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  GetUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  //Get data by page and pagination
  @Get('data/:pageInput/:limitInput')
  @ApiOperation({ summary: 'Get data by page and pagination' })
  async GetUserByPagination(
    @Param('pageInput') pageInput: number,
    @Query('page') page = pageInput,
    @Param('limitInput') limitInput: number,
    @Query('limit') limit = limitInput,
  ) {
    const skip = (page - 1) * limit;
    const [data, count] = await Promise.all([
      this.userService.findData(limit, skip),
      this.userService.getAllDocument(),
    ]);
    const totalPages = Math.ceil(count / limit);
    if (page <= 0 || page > totalPages)
      throw new HttpException(
        'ERROR: Current page > total pages or current page <= 0',
        422,
      );

    if (limitInput <= 0)
      throw new HttpException('ERROR: Page limit must be larger than 0', 422);
    return data;
  }

  //Update user by id
  @Patch(':id')
  @ApiOperation({ summary: 'Update user by id' })
  UpdateUserById(@Param('id') id: string, updateUserDTO: UpdateUserDTO) {
    return this.userService.UpdateUserById(id, updateUserDTO);
  }

  //Delete user by id
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  DeleteUserById(@Param('id') id: string) {
    return this.userService.DeleteUserById(id);
  }

  //Delete multiple user
  @Delete()
  @ApiOperation({ summary: 'Delete many user by id' })
  DeleteManyUserById(@Body() userIds: string[]) {
    return this.userService.DeleteManyUserById(userIds);
  }
}

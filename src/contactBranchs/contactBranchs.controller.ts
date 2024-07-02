import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContactBranchsService } from './contactBranchs.service';
import { CreateContactBranchsDTO } from './dto/CreateContactBranch.DTO';
import mongoose from 'mongoose';
import { UpdateContactBranchsDTO } from './dto/UpdateContactBranch.DTO';

@ApiTags('Contact branch')
@Controller('contactBranchs')
export class contactBranchsController {
  constructor(private contactbranchsService: ContactBranchsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create new contact branch' })
  async createContactbranch(
    @Body() createContactbranchsDTO: CreateContactBranchsDTO,
  ) {
    return await this.contactbranchsService.createContactBranch(
      createContactbranchsDTO,
    );
  }
  @Get()
  @ApiOperation({ summary: 'Get contact branch data' })
  getHomeContent() {
    return this.contactbranchsService.getContactBranch();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get contact branch data by id' })
  getContactbranchById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Contact branch data not found', 404);
    const findContactbranch =
      this.contactbranchsService.getContactBranchById(id);
    if (!findContactbranch)
      throw new HttpException('Contact branch not found', 404);
    return findContactbranch;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update contact branch data by id' })
  async updateContactbranch(
    @Param('id') id: string,
    @Body() updateContactbranchsDTO: UpdateContactBranchsDTO,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Contact branch id not found', 404);
    const updateContactbranch =
      await this.contactbranchsService.updateContactBranch(
        id,
        updateContactbranchsDTO,
      );
    if (!updateContactbranch)
      throw new HttpException('Contact branch not found', 404);
    return updateContactbranch;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete contact branch data by id' })
  async deleteContactbranch(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Contact branch id not found', 404);
    const deleteContactbranch =
      await this.contactbranchsService.deleteContactBranch(id);
    if (!deleteContactbranch)
      throw new HttpException('Contact branch not found', 404);
    return deleteContactbranch;
  }
}

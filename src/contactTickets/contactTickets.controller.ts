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
import { ContactTicketsService } from './contactTickets.service';
import { CreateContactTicketsDTO } from './dto/CreateContactTicket.DTO';
import mongoose from 'mongoose';
import { UpdateContactTicketsDTO } from './dto/UpdateContactTicket.DTO';

@ApiTags('Contact ticket')
@Controller('contactTickets')
export class contactTicketsController {
  constructor(private contactTicketsService: ContactTicketsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create new contact ticket' })
  async createContactTicket(
    @Body() createContactTicketsDTO: CreateContactTicketsDTO,
  ) {
    return await this.contactTicketsService.createContactTicket(
      createContactTicketsDTO,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get contact ticket data' })
  getHomeContent() {
    return this.contactTicketsService.getContactTicket();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get contact ticket data by id' })
  getContactTicketById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Contact ticket id not valid', 400);
    const findContactTicket =
      this.contactTicketsService.getContactTicketById(id);
    if (!findContactTicket)
      throw new HttpException('Contact ticket not found', 404);
    return findContactTicket;
  }

  @Get('data/:pageInput/:limitInput')
  @ApiOperation({ summary: 'Get contatct ticket by pagination' })
  async getContactTicketByPagination(
    @Param('pageInput') pageInput: number,
    @Query('page') page = pageInput,
    @Param('limitInput') limitInput: number,
    @Query('limit') limit = limitInput,
  ) {
    const skip = (page - 1) * limit;
    const [data, count] = await Promise.all([
      this.contactTicketsService.getDataByPage(limit, skip),
      this.contactTicketsService.getDataCount(),
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
  @Patch(':id')
  @ApiOperation({ summary: 'Update contact ticket data by id' })
  async updateContactTicket(
    @Param('id') id: string,
    @Body() updateContactTicketsDTO: UpdateContactTicketsDTO,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Contact ticket id not valid', 400);
    const updateContactTicket =
      await this.contactTicketsService.updateContactTicket(
        id,
        updateContactTicketsDTO,
      );
    if (!updateContactTicket)
      throw new HttpException('Contact ticket not found', 404);
    return updateContactTicket;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete contact ticket data by id' })
  async deleteContactTicket(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Contact ticket id not valid', 400);
    const deleteContactTicket =
      await this.contactTicketsService.deleteContactTicket(id);
    if (!deleteContactTicket)
      throw new HttpException('Contact ticket not found', 404);
    return deleteContactTicket;
  }
}

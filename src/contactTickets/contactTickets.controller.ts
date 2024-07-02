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
    if (!isValid) throw new HttpException('Contact ticket data not found', 404);
    const findContactTicket =
      this.contactTicketsService.getContactTicketById(id);
    if (!findContactTicket)
      throw new HttpException('Contact ticket not found', 404);
    return findContactTicket;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update contact ticket data by id' })
  async updateContactTicket(
    @Param('id') id: string,
    @Body() updateContactTicketsDTO: UpdateContactTicketsDTO,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Contact ticket id not found', 404);
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
    if (!isValid) throw new HttpException('Contact ticket id not found', 404);
    const deleteContactTicket =
      await this.contactTicketsService.deleteContactTicket(id);
    if (!deleteContactTicket)
      throw new HttpException('Contact ticket not found', 404);
    return deleteContactTicket;
  }
}

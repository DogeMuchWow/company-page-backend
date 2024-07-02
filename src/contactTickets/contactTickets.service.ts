import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { contactTicket } from 'src/schemas/contactTicket.schema';
import { CreateContactTicketsDTO } from './dto/CreateContactTicket.DTO';
import { UpdateContactTicketsDTO } from './dto/UpdateContactTicket.DTO';

@Injectable()
export class ContactTicketsService {
  constructor(
    @InjectModel(contactTicket.name)
    private contactTicketsModule: Model<contactTicket>,
  ) {}

  //Create new contact ticket
  async createContactTicket(createContactTicketDTO: CreateContactTicketsDTO) {
    const newContactTicket = new this.contactTicketsModule(
      createContactTicketDTO,
    );
    return await newContactTicket.save();
  }

  //Read contact ticket
  getContactTicket() {
    return this.contactTicketsModule.find();
  }

  //Read contact ticket by id
  getContactTicketById(id: string) {
    return this.contactTicketsModule.findById(id);
  }

  //Update contact ticket
  async updateContactTicket(
    id: string,
    updateContactTicketsDTO: UpdateContactTicketsDTO,
  ) {
    return await this.contactTicketsModule.findByIdAndUpdate(
      id,
      updateContactTicketsDTO,
    );
  }

  //Delete contact ticket
  async deleteContactTicket(id: string) {
    return this.contactTicketsModule.findByIdAndDelete(id);
  }
}

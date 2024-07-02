import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ContactTicketSchema,
  contactTicket,
} from 'src/schemas/contactTicket.schema';
import { ContactTicketsService } from './contactTickets.service';
import { contactTicketsController } from './contactTickets.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: contactTicket.name,
        schema: ContactTicketSchema,
      },
    ]),
  ],
  providers: [ContactTicketsService],
  controllers: [contactTicketsController],
})
export class contactTicketsModule {}

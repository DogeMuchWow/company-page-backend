import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type contactTicketDocument = mongoose.HydratedDocument<contactTicket>;

@Schema()
export class contactTicket {
  @Prop({ type: mongoose.Schema.Types.String, require: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.String, require: true })
  phone: string;

  @Prop({ type: mongoose.Schema.Types.String, require: true })
  email: string;

  @Prop({ type: mongoose.Schema.Types.String, require: true })
  message: string;

  @Prop({ type: mongoose.Schema.Types.Boolean, require: true })
  checked: boolean;
}

export const ContactTicketSchema = SchemaFactory.createForClass(contactTicket);

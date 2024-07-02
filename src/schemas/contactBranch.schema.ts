import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type contactBranchDocument = mongoose.HydratedDocument<contactBranch>;

@Schema()
export class contactBranch {
  @Prop({ type: mongoose.Schema.Types.String, require: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.String, require: true })
  phone: string;

  @Prop({ type: mongoose.Schema.Types.String, require: true })
  email: string;

  @Prop({ type: mongoose.Schema.Types.String, require: true })
  address: string;
}

export const ContactBranchSchema = SchemaFactory.createForClass(contactBranch);

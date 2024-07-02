import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type slideDocument = HydratedDocument<slide>;

@Schema()
export class slide {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  image: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  navigate: string;
}

export const slideSchema = SchemaFactory.createForClass(slide);

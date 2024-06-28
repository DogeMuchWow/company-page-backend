import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type slideDocument = HydratedDocument<slide>;

@Schema()
export class slide {
  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop()
  description: string;

  @Prop()
  navigate: string;
}

export const slideSchema = SchemaFactory.createForClass(slide);

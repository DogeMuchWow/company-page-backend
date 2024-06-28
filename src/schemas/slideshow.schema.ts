import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type slideshowDocument = HydratedDocument<slideshow>;

@Schema()
export class slideshow {
  @Prop()
  name: string;

  @Prop()
  slides: ObjectId[];

  @Prop()
  effect: string;

  @Prop()
  display: true;
}

export const slideshowSchema = SchemaFactory.createForClass(slideshow);

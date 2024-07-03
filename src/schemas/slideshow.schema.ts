import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type slideshowDocument = HydratedDocument<slideshow>;

@Schema()
export class slideshow {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  slides: ObjectId[];

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  effect: string;

  @Prop({ type: mongoose.Schema.Types.Boolean, required: true })
  display: boolean;
}

export const slideshowSchema = SchemaFactory.createForClass(slideshow);

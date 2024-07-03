import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type slideshowDocument = HydratedDocument<slideshow>;

@Schema()
export class slideshow {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  name: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: 'slide',
  })
  slides: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  effect: string;

  @Prop({ type: mongoose.Schema.Types.Boolean, required: true })
  display: boolean;
}

export const slideshowSchema = SchemaFactory.createForClass(slideshow);

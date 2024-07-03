import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type categoryDocument = mongoose.HydratedDocument<category>;

@Schema()
export class category {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  icon: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'category',
    required: false,
  })
  children?: mongoose.Schema.Types.ObjectId[];
}

export const CategorySchema = SchemaFactory.createForClass(category);

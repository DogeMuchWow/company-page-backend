import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type newsDocument = HydratedDocument<news>;

@Schema()
export class news {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  image: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  summary: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  content: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  author: string;

  @Prop({ type: mongoose.Schema.Types.Boolean, required: true })
  mode: boolean;

  @Prop({ type: [mongoose.Schema.Types.String], required: true })
  tags: string[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: 'category',
  })
  categories: ObjectId[];

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  views: number;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  timepublic: string;
}
export const newsSchema = SchemaFactory.createForClass(news);

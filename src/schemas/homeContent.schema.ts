import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type homeContentDocument = mongoose.HydratedDocument<homeContent>;

@Schema()
export class homeContent {
  @Prop({ type: mongoose.Schema.Types.String, require: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.String, require: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.String, require: true })
  image: string;
}

export const HomeContentSchema = SchemaFactory.createForClass(homeContent);

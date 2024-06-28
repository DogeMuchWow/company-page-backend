import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type homeContentDocument = HydratedDocument<homeContent>;

@Schema()
export class homeContent {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  image: string;
}

export const homeContentSchema = SchemaFactory.createForClass(homeContent);

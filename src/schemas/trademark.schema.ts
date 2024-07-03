import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type trademarkDocument = HydratedDocument<trademark>;

@Schema()
export class trademark {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  copyright: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'license',
  })
  license: ObjectId;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  favicon: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  logo: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  logoIcon: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  logoWord: string;
}

export const trademarkSchema = SchemaFactory.createForClass(trademark);

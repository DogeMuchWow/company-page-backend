import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';

@Schema()
export class trademark {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  copyright: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  licenses: ObjectId;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  favicon: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  logo: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  logoIcon: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  logoWord: string;
}

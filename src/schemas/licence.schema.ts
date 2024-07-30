import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type licenseDocument = mongoose.HydratedDocument<license>;

@Schema()
export class license {
  @Prop({ type: mongoose.Schema.Types.String, require: true })
  text: string;

  @Prop({ type: [mongoose.Schema.Types.String], require: true })
  images: string[];
}

export const LicenseSchema = SchemaFactory.createForClass(license);

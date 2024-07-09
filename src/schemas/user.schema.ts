import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type userDocument = HydratedDocument<user>;

@Schema()
export class user {
  @Prop({
    type: {
      firstname: { type: mongoose.Schema.Types.String, required: true },
      lastname: { type: mongoose.Schema.Types.String, required: true },
    },
  })
  fullname: { firstname: string; lastname: string };

  @Prop({ type: mongoose.Schema.Types.Boolean, required: true })
  block: boolean;

  @Prop({ type: mongoose.Schema.Types.String, required: true, unique: true })
  email: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true, unique: true })
  username: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  password: string;

  @Prop({ type: [mongoose.Schema.Types.String], required: true })
  roles: mongoose.Schema.Types.String[];

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  status: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  sex: string;
}

export const userSchema = SchemaFactory.createForClass(user);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema({ timestamps: true })
export class Auth {
  @Prop({ required: true })
  name: string;
  @Prop({
    required: true,
    unique: true,
    lowercase: true,
  })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  salt: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);

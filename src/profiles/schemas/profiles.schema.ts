import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ProfilesDocument = Profiles & Document;

@Schema()
export class Profiles {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  birthday: string;

  @Prop()
  country: string;

  @Prop()
  city: string;

  @Prop({ required: true })
  cp: string;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const ProfilesSchema = SchemaFactory.createForClass(Profiles);

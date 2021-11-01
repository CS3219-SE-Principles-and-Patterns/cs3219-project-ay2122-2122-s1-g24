import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'rooms' })
export class Room {
  @Prop({ type: [String], required: true })
  users: string[];

  @Prop({ required: true })
  questionTitle: string;

  @Prop({ required: true })
  questionDesc: string;
}

export type RoomDocument = Room & Document;

export const RoomSchema = SchemaFactory.createForClass(Room);

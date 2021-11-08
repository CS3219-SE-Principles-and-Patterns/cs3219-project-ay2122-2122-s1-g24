import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Difficulty } from '../questions/questions.const';
import { UserDto } from './rooms.const';

@Schema({ collection: 'rooms' })
export class Room {
  @Prop({ required: true })
  users: UserDto[];

  @Prop({ required: true })
  questionTitle: string;

  @Prop({ required: true })
  questionDesc: string;

  @Prop({ required: true })
  difficulty: Difficulty;
}

export type RoomDocument = Room & Document;

export const RoomSchema = SchemaFactory.createForClass(Room);

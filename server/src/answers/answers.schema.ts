import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Difficulty } from '../questions/questions.const';

@Schema({ collection: 'answers' })
export class Answer {
  @Prop({ required: true, index: true })
  uid: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({
    required: true,
    index: true,
    enum: [Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD],
  })
  difficulty: string;

  @Prop({ required: true })
  answer: string;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;
}

export type AnswerDocument = Answer & Document;

export const AnswerSchema = SchemaFactory.createForClass(Answer);

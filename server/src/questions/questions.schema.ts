import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Difficulty } from './questions.const';

@Schema({ collection: 'questions' })
export class Question {
  @Prop({ required: true })
  title: string;

  @Prop({
    required: true,
    enum: [Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD],
  })
  difficulty: string;

  @Prop()
  description: string;
}

export type QuestionDocument = Question & Document;

export const QuestionSchema = SchemaFactory.createForClass(Question);

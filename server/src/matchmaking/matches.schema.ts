import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Difficulty } from 'questions/questions.const';

@Schema({ collection: 'matches' })
export class Match {
  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  socketId: string;

  @Prop({
    required: true,
    index: true,
    enum: [Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD],
  })
  difficulty: string;
}

export type MatchDocument = Match & Document;

export const MatchSchema = SchemaFactory.createForClass(Match);

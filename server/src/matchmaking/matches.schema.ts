import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';
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

  @Prop({ type: Date, default: Date.now(), expires: '60s' })
  createdAt: Date;
}

export type MatchDocument = Match & Document;

const MatchSchema = SchemaFactory.createForClass(Match);
export { MatchSchema };

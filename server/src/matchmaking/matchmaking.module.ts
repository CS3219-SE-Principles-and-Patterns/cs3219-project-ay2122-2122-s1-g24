import { Module } from '@nestjs/common';
import QuestionsModule from 'src/questions/questions.module';
import MatchmakingController from './matchmaking.controller';

@Module({
  imports: [QuestionsModule],
  controllers: [MatchmakingController],
})
export default class MatchmakingModule {}

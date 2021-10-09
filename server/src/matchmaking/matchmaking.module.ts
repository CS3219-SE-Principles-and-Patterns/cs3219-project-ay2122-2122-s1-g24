import { Module } from '@nestjs/common';
import AuthModule from '../auth/auth.module';
import MatchmakingController from './matchmaking.controller';
import QuestionsModule from '../questions/questions.module';

@Module({
  imports: [AuthModule, QuestionsModule],
  controllers: [MatchmakingController],
})
export default class MatchmakingModule {}

import { Module } from '@nestjs/common';
import AuthModule from 'auth/auth.module';
import QuestionsModule from '../questions/questions.module';
import MatchmakingController from './matchmaking.controller';

@Module({
  imports: [AuthModule, QuestionsModule],
  controllers: [MatchmakingController],
})
export default class MatchmakingModule {}

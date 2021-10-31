import { Module } from '@nestjs/common';
import AuthModule from '../auth/auth.module';
import MatchmakingController from './matchmaking.controller';
import QuestionsModule from '../questions/questions.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Match, MatchSchema } from './matches.schema';
import MatchesRepository from './matches.repository';
import RoomsModule from 'rooms/rooms.module';

@Module({
  imports: [
    AuthModule,
    QuestionsModule,
    RoomsModule,
    MongooseModule.forFeature([{ name: Match.name, schema: MatchSchema }]),
  ],
  controllers: [MatchmakingController],
  providers: [MatchesRepository],
})
export default class MatchmakingModule {}

import { Module } from '@nestjs/common';
import AuthModule from '../auth/auth.module';
import QuestionsModule from '../questions/questions.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Match, MatchSchema } from './matches.schema';
import MatchesRepository from './matches.repository';
import RoomsModule from 'rooms/rooms.module';
import MatchmakingGateway from './matchmaking.gateway';

@Module({
  imports: [
    AuthModule,
    QuestionsModule,
    RoomsModule,
    MongooseModule.forFeature([{ name: Match.name, schema: MatchSchema }]),
  ],
  providers: [MatchesRepository, MatchmakingGateway],
})
export default class MatchmakingModule {}

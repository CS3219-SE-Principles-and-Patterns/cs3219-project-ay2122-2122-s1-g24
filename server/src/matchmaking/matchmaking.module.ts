import { Module } from '@nestjs/common';
import AuthModule from '../auth/auth.module';
import QuestionsModule from '../questions/questions.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Match, MatchSchema } from './matches.schema';
import MatchmakingGateway from './matchmaking.gateway';
import MatchmakingRepository from './matchmaking.repository';
import MatchmakingService from './matchmaking.service';
import RoomsModule from 'rooms/rooms.module';

@Module({
  imports: [
    AuthModule,
    QuestionsModule,
    RoomsModule,
    MongooseModule.forFeature([{ name: Match.name, schema: MatchSchema }]),
  ],
  providers: [MatchmakingGateway, MatchmakingRepository, MatchmakingService],
})
export default class MatchmakingModule {}

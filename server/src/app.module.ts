import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import AuthModule from './auth/auth.module';
import config from './config';
import MongooseConfigService from './config/mongoose.config';
import MatchmakingModule from './matchmaking/matchmaking.module';
import QuestionsModule from './questions/questions.module';
import RoomsModule from 'rooms/rooms.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    AuthModule,
    MatchmakingModule,
    QuestionsModule,
    RoomsModule,
  ],
  providers: [],
})
export default class AppModule {}

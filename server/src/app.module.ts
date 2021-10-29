import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import RoomsGateway from './rooms/rooms.gateway';
import AuthModule from './auth/auth.module';
import config from './config';
import MongooseConfigService from './config/mongoose.config';
import MatchmakingModule from './matchmaking/matchmaking.module';
import QuestionsModule from './questions/questions.module';

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
  ],
  providers: [RoomsGateway],
})
export default class AppModule {}

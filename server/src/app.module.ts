import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import AuthModule from 'auth/auth.module';
import config from './config';
import MongooseConfigService from './config/mongoose.config';
import QuestionsModule from './questions/questions.module';
import MatchmakingModule from './matchmaking/matchmaking.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    AuthModule,
    QuestionsModule,
    MatchmakingModule,
  ],
})
export default class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import AnswersModule from './answers/answers.module';
import AuthModule from './auth/auth.module';
import MongooseConfigService from './config/mongoose.config';
import MatchmakingModule from './matchmaking/matchmaking.module';
import QuestionsModule from './questions/questions.module';
import RoomsModule from './rooms/rooms.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    AnswersModule,
    AuthModule,
    MatchmakingModule,
    QuestionsModule,
    RoomsModule,
  ],
})
export default class AppModule {}

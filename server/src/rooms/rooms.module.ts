import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import AuthModule from 'auth/auth.module';
import QuestionsModule from 'questions/questions.module';
import RoomsGateway from './rooms.gateway';
import RoomsRepository from './rooms.repository';
import { Room, RoomSchema } from './rooms.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    QuestionsModule,
    AuthModule,
  ],
  providers: [RoomsGateway, RoomsRepository],
  exports: [RoomsRepository],
})
export default class RoomsModule {}

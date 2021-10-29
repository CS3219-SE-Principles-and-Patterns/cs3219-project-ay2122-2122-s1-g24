import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import QuestionsModule from 'questions/questions.module';
import RoomsGateway from './rooms.gateway';
import { Room, RoomSchema } from './rooms.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    QuestionsModule,
  ],
  providers: [RoomsGateway],
  exports: [RoomsGateway],
})
export default class RoomsModule {}

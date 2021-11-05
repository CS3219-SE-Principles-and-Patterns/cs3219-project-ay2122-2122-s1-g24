import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import AnswersController from './answers.controller';
import AnswersRepository from './answers.repository';
import AnswersService from './answers.service';
import { Answer, AnswerSchema } from './answers.schema';
import RoomsModule from 'rooms/rooms.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]),
    RoomsModule,
  ],
  controllers: [AnswersController],
  providers: [AnswersRepository, AnswersService],
  exports: [AnswersRepository],
})
export default class AnswersModule {}

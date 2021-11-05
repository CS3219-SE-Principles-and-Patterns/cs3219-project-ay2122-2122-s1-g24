import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import AnswersRepository from './answers.repository';
import AnswersController from './answers.controller';
import { Answer, AnswerSchema } from './answers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]),
  ],
  controllers: [AnswersController],
  providers: [AnswersRepository],
})
export default class AnswersModule {}

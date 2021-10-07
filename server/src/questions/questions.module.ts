import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import QuestionsRepository from './questions.repository';
import { Question, QuestionSchema } from './questions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  providers: [QuestionsRepository],
  exports: [QuestionsRepository],
})
export default class QuestionsModule {}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionNotFoundError } from '../errors';
import { Difficulty } from './questions.const';
import { Question, QuestionDocument } from './questions.schema';

@Injectable()
export default class QuestionsRepository {
  public constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}

  public async find(difficulty: Difficulty): Promise<Question> {
    const questions: Question[] = await this.questionModel.aggregate([
      { $match: { difficulty } },
      { $sample: { size: 1 } },
    ]);

    if (questions.length == 0) throw new QuestionNotFoundError(difficulty);

    return questions[0];
  }
}

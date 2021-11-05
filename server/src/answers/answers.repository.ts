import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnswerDto } from './answers.const';
import { Answer, AnswerDocument } from './answers.schema';

@Injectable()
export default class AnswersRepository {
  public constructor(
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
  ) {}

  public async findAllForUser(uid: string): Promise<Answer[]> {
    const answers: Answer[] = await this.answerModel.find({ uid });

    return answers;
  }

  public async addAnswer(uid: string, answer: AnswerDto): Promise<Answer> {
    const createdAnswer: AnswerDocument = new this.answerModel({
      uid,
      ...answer,
      createdAt: new Date(),
    });

    return await createdAnswer.save();
  }
}

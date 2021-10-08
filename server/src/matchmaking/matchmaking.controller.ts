import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import isEmpty from 'lodash/isEmpty';
import { Difficulty } from '../questions/questions.const';
import { Question } from '../questions/questions.schema';
import QuestionsRepository from '../questions/questions.repository';
import { QuestionNotFoundError } from '../errors';

@Controller('matchmaking')
export default class MatchmakingController {
  public constructor(
    private readonly questionsRepository: QuestionsRepository,
  ) {}

  @Get()
  public async findMatch(@Query('difficulty') difficulty: Difficulty) {
    try {
      if (isEmpty(difficulty))
        throw new BadRequestException('"difficulty" is a required parameter');

      const isValidDifficulty: boolean =
        Object.values(Difficulty).includes(difficulty);

      if (!isValidDifficulty)
        throw new BadRequestException(
          `${difficulty} is not a valid difficulty`,
        );

      const question: Question = await this.questionsRepository.find(
        difficulty,
      );

      return { question };
    } catch (err) {
      if (err instanceof QuestionNotFoundError)
        throw new BadRequestException(err.message);

      throw err;
    }
  }

  @Delete('end-session')
  public async endSession() {
    /* temp */
  }
}

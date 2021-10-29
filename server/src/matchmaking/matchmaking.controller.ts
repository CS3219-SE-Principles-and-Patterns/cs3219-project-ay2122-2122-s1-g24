import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import isEmpty from 'lodash/isEmpty';
import AuthService from '../auth/auth.service';
import JwtAuthGuard from '../auth/jwt/jwt.guard';
import { QuestionNotFoundError } from '../errors';
import { Difficulty } from '../questions/questions.const';
import QuestionsRepository from '../questions/questions.repository';
import { Question } from '../questions/questions.schema';
import MatchesRepository from './matches.repository';

@Controller('matchmaking')
export default class MatchmakingController {
  public constructor(
    private readonly authService: AuthService,
    private readonly questionsRepository: QuestionsRepository,
    private readonly matchesRepo: MatchesRepository,
  ) {}

  @Get('test')
  public async test() {
    this.matchesRepo.addUser('user', 'sock', Difficulty.EASY);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
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
        throw new InternalServerErrorException(err.message);

      throw err;
    }
  }

  @Get('end-session')
  @UseGuards(JwtAuthGuard)
  public endSession(@Request() req) {
    const { roomId, iat, exp, ...user } = req.user;
    const accessToken = this.authService.login(user);

    return { accessToken };
  }
}

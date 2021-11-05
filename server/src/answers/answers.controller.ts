import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import JwtAuthGuard from '../auth/jwt/jwt.guard';
import { AnswerDto } from './answers.const';
import AnswersRepository from './answers.repository';
import { Answer } from './answers.schema';

@Controller('answers')
export default class AnswersController {
  constructor(private readonly answersRepository: AnswersRepository) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  public async getAnswers(@Request() req): Promise<Answer[]> {
    try {
      const answers: Answer[] = await this.answersRepository.findAllForUser(
        req.user.sub,
      );

      return answers;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public async submitAnswers(
    @Request() req,
    @Body('answer') answerDto: AnswerDto,
  ): Promise<Answer> {
    try {
      const answer: Answer = await this.answersRepository.addAnswer(
        req.user.sub,
        answerDto,
      );

      return answer;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}

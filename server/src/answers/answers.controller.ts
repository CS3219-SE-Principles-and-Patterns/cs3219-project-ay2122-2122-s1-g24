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
import { Answer } from './answers.schema';
import AnswersService from './answers.service';

@Controller('answers')
export default class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  public async getAnswers(@Request() req): Promise<Answer[]> {
    try {
      return await this.answersService.findAllForUser(req.user.sub);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public async submitAnswers(
    @Request() req,
    @Body('answer') answer: string,
    @Body('roomid') roomid: string,
  ): Promise<Answer> {
    try {
      const savedAnswer: Answer = await this.answersService.addAnswer(
        req.user.sub,
        roomid,
        answer,
      );

      return savedAnswer;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}

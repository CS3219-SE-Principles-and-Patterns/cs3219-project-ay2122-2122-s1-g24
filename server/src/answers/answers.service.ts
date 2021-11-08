import { Injectable } from '@nestjs/common';
import { Answer } from './answers.schema';
import { AnswerDto } from './answers.const';
import AnswersRepository from './answers.repository';
import { Room } from '../rooms/rooms.schema';
import RoomsRepository from '../rooms/rooms.repository';

@Injectable()
export default class AnswersService {
  public constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly roomsRepository: RoomsRepository,
  ) {}

  public async findAllForUser(uid: string) {
    const answers: Answer[] = await this.answersRepository.findAllForUser(uid);

    return answers;
  }

  public async addAnswer(
    uid: string,
    rid: string,
    answer: string,
  ): Promise<Answer> {
    const {
      questionTitle: title,
      questionDesc: description,
      difficulty,
    }: Room = await this.roomsRepository.getRoomDetails(rid);
    const answerDto: AnswerDto = {
      title,
      description,
      difficulty,
      answer,
    };
    const savedAnswer: Answer = await this.answersRepository.addAnswer(
      uid,
      answerDto,
    );

    return savedAnswer;
  }
}

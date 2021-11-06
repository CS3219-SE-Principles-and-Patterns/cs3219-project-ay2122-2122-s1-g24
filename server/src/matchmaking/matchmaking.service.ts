import { Injectable } from '@nestjs/common';
import { Difficulty } from '../questions/questions.const';
import { JwtPayload } from '../auth/auth.const';
import { Match } from './matches.schema';
import MatchmakingRepository from './matchmaking.repository';
import QuestionsRepository from '../questions/questions.repository';
import RoomsRepository from '../rooms/rooms.repository';
import { UserDto } from 'rooms/rooms.const';

@Injectable()
export default class MatchmakingService {
  public constructor(
    private readonly matchmakingRepository: MatchmakingRepository,
    private readonly roomRepository: RoomsRepository,
    private readonly questionRepository: QuestionsRepository,
  ) {}

  public async removeUser(socketId: string) {
    return await this.matchmakingRepository.removeUser(socketId);
  }

  public async findMatch(
    clientId: string,
    difficulty: Difficulty,
    { sub, name }: JwtPayload,
  ): Promise<{ foundMatch: boolean; roomId?: string; matchSocketId?: string }> {
    const match: Match = await this.matchmakingRepository.find(difficulty, sub);

    if (match) {
      const question = await this.questionRepository.find(difficulty);
      const userDto: UserDto = { uid: sub, name: name };
      const matchUserDto: UserDto = { uid: match.uid, name: match.name };
      const roomId = await this.roomRepository.createRoom(
        [userDto, matchUserDto],
        question,
      );

      return { foundMatch: true, roomId, matchSocketId: match.socketId };
    }

    await this.matchmakingRepository.addUser(sub, name, clientId, difficulty);

    return { foundMatch: false };
  }
}

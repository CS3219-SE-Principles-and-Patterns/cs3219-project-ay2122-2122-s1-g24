import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import isEmpty from 'lodash/isEmpty';
import { Server, Socket } from 'socket.io';
import MatchesRepository from './matches.repository';
import { Difficulty } from '../questions/questions.const';
import RoomsRepository from 'rooms/rooms.repository';
import QuestionsRepository from 'questions/questions.repository';
import AuthService from 'auth/auth.service';
import { User } from 'rooms/rooms.const';

@WebSocketGateway({
  namespace: 'matchmaking',
  transports: ['websocket'],
  cors: true,
})
export default class MatchmakingGateway implements OnGatewayDisconnect {
  public constructor(
    private matchRepository: MatchesRepository,
    private readonly authService: AuthService,
    private roomRepository: RoomsRepository,
    private questionRepository: QuestionsRepository,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleDisconnect(client: Socket) {
    // Remove the user from any queue it might currently be in
    await this.matchRepository.removeUser(client.id);
  }

  @SubscribeMessage('findMatch')
  async handleMatch(
    @ConnectedSocket() client: Socket,
    @MessageBody('difficulty') diff: Difficulty,
    @MessageBody('auth') token,
  ) {
    // Call some method from matchmaking service here
    try {
      const user = this.authService.verify(token);
      await this.matchRepository.removeUser(user.sub);

      if (isEmpty(diff))
        throw new Error('"difficulty" is a required parameter');

      const isValidDifficulty: boolean =
        Object.values(Difficulty).includes(diff);

      if (!isValidDifficulty)
        throw new Error(`${diff} is not a valid difficulty`);

      const match = await this.matchRepository.find(diff, user.sub);
      if (match) {
        const question = await this.questionRepository.find(diff);
        const userDto: User = { uid: user.sub, name: user.name };
        const matchUserDto: User = { uid: match.uid, name: match.name };
        const room = await this.roomRepository.createRoom(
          [userDto, matchUserDto],
          question,
        );

        client.emit('assignRoom', room);
        client.to(match.socketId).emit('assignRoom', room);
        this.server.socketsLeave(match.socketId);

        return { ok: true };
      }

      this.matchRepository.addUser(user.sub, user.name, client.id, diff);
      client.join(client.id);
      client.emit('noMatch');

      return { ok: true };
    } catch (err) {
      // Invalid JWT or difficulty
      return { err: err.message };
    }
  }
}

import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import MatchesRepository from './matches.repository';
import { Difficulty } from '../questions/questions.const';
import RoomsRepository from 'rooms/rooms.repository';
import QuestionsRepository from 'questions/questions.repository';
import { isEmpty } from 'lodash';
import AuthService from 'auth/auth.service';

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

  /**
   * Sends the room ID to the user connected to this socket.
   * @param room The ID of the room the user should connect to.
   * @param socket The socket the user to send is connected to.
   */
  async emitRoomToUser(room: string, socket: string) {
    this.server.to(socket).emit('assignRoom', room);
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
      console.log(user);
      console.log(diff)
      if (isEmpty(diff))
        throw new Error('"difficulty" is a required parameter');

      const isValidDifficulty: boolean =
        Object.values(Difficulty).includes(diff);

      if (!isValidDifficulty)
        throw new Error(`${diff} is not a valid difficulty`);

      const match = await this.matchRepository.find(diff);
      if (match && this.server.sockets[match.socketId]) {
        const question = await this.questionRepository.find(diff);
        const room = await this.roomRepository.createRoom(
          [user.sub, match.user],
          question,
        );

        client.emit('assignRoom', room);
        this.emitRoomToUser(match.socketId, room);

        return;
      }

      this.matchRepository.addUser(user.sub, client.id, diff);
      client.emit('noMatch');
    } catch (err) {
      // Invalid JWT or difficulty
      return err;
    }
  }
}

import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { JsonWebTokenError } from 'jsonwebtoken';
import isEmpty from 'lodash/isEmpty';
import { Server, Socket } from 'socket.io';
import AuthService from '../auth/auth.service';
import MatchmakingService from './matchmaking.service';
import { Difficulty } from '../questions/questions.const';

@WebSocketGateway({
  namespace: 'matchmaking',
  transports: ['websocket'],
  cors: true,
})
export default class MatchmakingGateway implements OnGatewayDisconnect {
  public constructor(
    private readonly matchmakingService: MatchmakingService,
    private readonly authService: AuthService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('disconnectUser')
  async handleDisconnect(client: Socket) {
    // Remove the user from any queue it might currently be in
    await this.matchmakingService.removeUser(client.id);
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
      await this.matchmakingService.removeUser(client.id);

      if (isEmpty(diff))
        throw new Error('"difficulty" is a required parameter');

      const isValidDifficulty: boolean =
        Object.values(Difficulty).includes(diff);

      if (!isValidDifficulty)
        throw new Error(`${diff} is not a valid difficulty`);

      const { foundMatch, roomId, matchSocketId } =
        await this.matchmakingService.findMatch(client.id, diff, user);

      if (foundMatch) {
        client.emit('assignRoom', roomId);
        client.broadcast.to(matchSocketId).emit('assignRoom', roomId);
        this.server.socketsLeave(matchSocketId);
      } else {
        client.join(client.id);
      }

      return { ok: true };
    } catch (err) {
      // Invalid JWT or difficulty
      if (err instanceof JsonWebTokenError)
        return { err: err.message, authError: true };

      return { err: err.message };
    }
  }
}

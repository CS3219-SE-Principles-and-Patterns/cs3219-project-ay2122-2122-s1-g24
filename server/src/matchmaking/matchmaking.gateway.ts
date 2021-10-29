import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as Automerge from 'automerge';
import MatchesRepository from './matches.repository';
import { Difficulty } from 'questions/questions.const';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway()
export class MatchmakingGateway implements OnGatewayDisconnect {
  public constructor(
    private matchRepo: MatchesRepository,
    private readonly jwtService: JwtService,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleDisconnect(client: Socket) {
    // Remove the user from any queue it might ccurrently be in
    await this.matchRepo.removeUser(client.id);
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
      const user = this.jwtService.verify(token);

      const match = await this.matchRepo.find(diff);
      if (match) {
        const room = 'room';
        client.emit('assignRoom', room);
        this.emitRoomToUser(match.socketId, room);

        return;
      }

      this.matchRepo.addUser(user.sub, client.id, diff);
      client.emit('noMatch');
    } catch (err) {
      // Invalid JWT
      return err;
    }
  }
}

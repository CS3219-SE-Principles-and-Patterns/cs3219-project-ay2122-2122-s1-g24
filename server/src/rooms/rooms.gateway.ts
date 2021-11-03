import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import RoomsRepository from './rooms.repository';
import AuthService from '../auth/auth.service';

@WebSocketGateway({
  namespace: 'rooms',
  transports: ['websocket'],
  cors: true,
})
export default class RoomsGateway {
  public constructor(
    private roomRepository: RoomsRepository,
    private authService: AuthService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinRoom')
  async handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody('auth') token,
    @MessageBody('room') room: string,
  ): Promise<any> {
    try {
      this.authService.verify(token);

      // TODO: Retrieve document contents from database (or request history from other user)
      const roomDetails = await this.roomRepository.getRoomDetails(room);
      if (roomDetails) {
        client.join(room);

        return roomDetails;
      }

      // TODO: Error handling for no results found.
      return undefined;
    } catch (err) {
      return undefined;
    }
  }

  @SubscribeMessage('update')
  async handleUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody('auth') token,
    @MessageBody('room') room: string,
    @MessageBody('updates') changes: string,
  ) {
    try {
      this.authService.verify(token);
      // TODO: Test if this causes duplicate changes in the sender
      // If it does, then need to try and use the sync methods instead
      this.server.to(room).emit('docUpdate', changes);
    } catch (err) {
      return err;
    }
  }

  @SubscribeMessage('endSession')
  async handleEnd(
    @ConnectedSocket() client: Socket,
    @MessageBody('auth') token,
    @MessageBody('room') room: string,
  ) {
    try {
      this.authService.verify(token);
      this.server.to(room).emit('end');
    } catch (err) {
      return err;
    }
  }
}

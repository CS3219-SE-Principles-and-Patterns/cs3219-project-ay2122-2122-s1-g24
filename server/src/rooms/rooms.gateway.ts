import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as Automerge from 'automerge';
import RoomsRepository from './rooms.repository';

@WebSocketGateway()
export default class RoomsGateway {
  public constructor(private roomRepo: RoomsRepository) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinRoom')
  async handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody('auth') token,
    @MessageBody('room') room: string,
  ): Promise<any> {
    // TODO: Implement auth check

    // TODO: Retrieve document contents from database (or request history from other user)
    const roomDetails = await this.roomRepo.getRoomDetails(room);
    if (roomDetails) {
      client.join(room);

      return roomDetails;
    }

    // TODO: Error handling for no results found.
    return undefined;
  }

  @SubscribeMessage('update')
  async handleUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody('auth') token,
    @MessageBody('room') room: string,
    @MessageBody('updates') changes: Automerge.BinaryChange[],
  ) {
    // TODO: Authentication check
    // TODO: Test if this causes duplicate changes in the sender
    // If it does, then need to try and use the sync methods instead
    this.server.to(room).emit('docUpdate', changes);
  }
}

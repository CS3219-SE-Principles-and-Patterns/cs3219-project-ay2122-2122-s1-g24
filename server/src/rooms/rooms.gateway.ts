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
import AnswersRepository from 'answers/answers.repository';
import { AnswerDto } from 'answers/answers.const';
import { Difficulty } from 'questions/questions.const';

interface Position {
  ch: number;
  line: number;
}

interface Changes {
  from: Position;
  to: Position;
  text: string[];
  removed: string[];
  origin: string;
}

@WebSocketGateway({
  namespace: 'rooms',
  transports: ['websocket'],
  cors: true,
})
export default class RoomsGateway {
  public constructor(
    private roomRepository: RoomsRepository,
    private authService: AuthService,
    private answersRepo: AnswersRepository,
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
    @MessageBody('updates') changes: Changes,
  ) {
    try {
      this.authService.verify(token);
      // TODO: Test if this causes duplicate changes in the sender
      // If it does, then need to try and use the sync methods instead
      client.broadcast.to(room).emit('docUpdate', { changes, token });
    } catch (err) {
      return err;
    }
  }

  @SubscribeMessage('endSession')
  async handleEnd(
    @ConnectedSocket() client: Socket,
    @MessageBody('auth') token,
    @MessageBody('room') room: string,
    @MessageBody('answer') answer: string,
  ) {
    try {
      this.authService.verify(token);
      this.server.to(room).emit('end');
      this.server.in(room).socketsLeave(room);
      const roomDetails = await this.roomRepository.endSession(room);
      const answerDto: AnswerDto = {
        title: roomDetails.questionTitle,
        description: roomDetails.questionDesc,
        difficulty: roomDetails.difficulty,
        answer,
      };
      roomDetails.users.forEach((user) => {
        this.answersRepo.addAnswer(user.uid, answerDto);
      });
    } catch (err) {
      return err;
    }
  }
}

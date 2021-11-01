import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './rooms.schema';
import { Question } from 'questions/questions.schema';

@Injectable()
export default class RoomsRepository {
  public constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
  ) {}

  public async createRoom(
    users: string[],
    question: Question,
  ): Promise<string> {
    const createdRoom = new this.roomModel({
      users,
      questionTitle: question.title,
      questionDesc: question.description,
    });
    await createdRoom.save();

    return createdRoom.id;
  }

  public async getRoomDetails(roomId: string): Promise<Room> {
    const room = await this.roomModel.findById(roomId);

    return room;
  }
}

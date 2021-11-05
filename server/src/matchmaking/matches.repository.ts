import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Difficulty } from 'questions/questions.const';
import { Match, MatchDocument } from './matches.schema';

@Injectable()
export default class MatchesRepository {
  public constructor(
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>,
  ) {}

  /**
   * Looks for any user also registered in this difficulty, and pops them from the collection.
   * @param difficulty The difficulty to search for.
   * @param sub The user to find a match for.
   * @returns Match object containing the other user's details.
   */
  public async find(difficulty: Difficulty, sub: string): Promise<Match> {
    const match = await this.matchModel.findOneAndDelete({
      user: { $ne: sub },
      difficulty,
    });

    return match;
  }

  public async removeUser(socketId: string) {
    await this.matchModel.deleteOne({ socketId });
  }

  public async addUser(
    uid: string,
    name: string,
    socketId: string,
    difficulty: Difficulty,
  ) {
    const createdMatch = new this.matchModel({
      uid,
      name,
      socketId,
      difficulty,
    });

    return await createdMatch.save();
  }
}

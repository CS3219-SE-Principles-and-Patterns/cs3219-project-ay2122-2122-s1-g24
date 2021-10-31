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
   * @returns Match object containing the other user's details.
   */
  public async find(difficulty: Difficulty): Promise<Match> {
    const match = await this.matchModel.findOneAndDelete({ difficulty });

    return match;
  }

  public async removeUser(socketId: string) {
    await this.matchModel.deleteOne({ socketId });
  }

  public async addUser(user: string, socketId: string, difficulty: Difficulty) {
    const createdMatch = new this.matchModel({ user, socketId, difficulty });

    return await createdMatch.save();
  }
}

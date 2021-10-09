import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import AuthService from '../auth/auth.service';
import { QuestionNotFoundError } from '../errors';
import MatchmakingController from './matchmaking.controller';
import { Difficulty } from '../questions/questions.const';
import QuestionsRepository from '../questions/questions.repository';

const authService = { login: jest.fn() };
const questionsRepository = { find: jest.fn() };

describe('/src/matchmaking/matchmaking.controller', () => {
  let matchmakingController: MatchmakingController;

  beforeAll(async () => {
    const matchmakingModule: TestingModule = await Test.createTestingModule({
      controllers: [MatchmakingController],
      providers: [AuthService, QuestionsRepository],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .overrideProvider(QuestionsRepository)
      .useValue(questionsRepository)
      .compile();

    matchmakingController = matchmakingModule.get<MatchmakingController>(
      MatchmakingController,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#findMatch', () => {
    it('should throw BadRequestException if no difficulty query', () => {
      expect(() => matchmakingController.findMatch(undefined)).rejects.toEqual(
        new BadRequestException('"difficulty" is a required parameter'),
      );
      expect(() => matchmakingController.findMatch(null)).rejects.toEqual(
        new BadRequestException('"difficulty" is a required parameter'),
      );
      expect(() =>
        matchmakingController.findMatch('' as Difficulty),
      ).rejects.toEqual(
        new BadRequestException('"difficulty" is a required parameter'),
      );
    });

    it('should throw BadRequestException if invalid difficulty query', () => {
      expect(() =>
        matchmakingController.findMatch('invalid difficulty' as Difficulty),
      ).rejects.toEqual(
        new BadRequestException('invalid difficulty is not a valid difficulty'),
      );
    });

    it('should throw InternalServerErrorException if no question found', () => {
      questionsRepository.find.mockRejectedValueOnce(
        new QuestionNotFoundError(Difficulty.MEDIUM),
      );

      expect(() =>
        matchmakingController.findMatch(Difficulty.MEDIUM),
      ).rejects.toEqual(
        new InternalServerErrorException(
          'Question for medium difficulty was not found',
        ),
      );
    });

    it('should return question', async () => {
      const question = {
        _id: '615f1871f564641180186469',
        title: 'Math Question',
        description: 'What is 1 % 1?',
        difficulty: 'hard',
      };

      questionsRepository.find.mockResolvedValueOnce(question);

      const result = await matchmakingController.findMatch(Difficulty.HARD);

      expect(questionsRepository.find).toHaveBeenCalledTimes(1);
      expect(questionsRepository.find).toHaveBeenLastCalledWith(
        Difficulty.HARD,
      );

      expect(result).toStrictEqual({ question });
    });
  });

  describe('#endSession', () => {
    it('should return accessToken without roomId', () => {
      const accessToken = 'test-token';
      const request = {
        user: {
          roomId: 'should be excluded',
          iat: 'should be excluded',
          exp: 'should be excluded',
          sub: 'abc123',
          name: 'Alicia',
          provider: 'google',
          picture: 'https://randomuser.me/api/portraits/women/68.jpg',
        },
      };

      authService.login.mockReturnValueOnce(accessToken);

      const result = matchmakingController.endSession(request);

      expect(authService.login).toBeCalledTimes(1);
      expect(authService.login).toHaveBeenLastCalledWith({
        sub: 'abc123',
        name: 'Alicia',
        provider: 'google',
        picture: 'https://randomuser.me/api/portraits/women/68.jpg',
      });

      expect(result).toStrictEqual({ accessToken });
    });
  });
});

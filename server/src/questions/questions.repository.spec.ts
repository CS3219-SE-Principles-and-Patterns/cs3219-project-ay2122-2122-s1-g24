import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { QuestionNotFoundError } from '../errors';
import { Difficulty } from './questions.const';
import QuestionsRepository from './questions.repository';
import { Question } from './questions.schema';

const questionModel = { aggregate: jest.fn() };

describe('/src/notes/notes.repository', () => {
  let questionsRepository: QuestionsRepository;

  beforeAll(async () => {
    const questionsModule: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Question.name),
          useValue: questionModel,
        },
        QuestionsRepository,
      ],
    }).compile();

    questionsRepository =
      questionsModule.get<QuestionsRepository>(QuestionsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#find', () => {
    const expectedEasyResult = {
      _id: '615f1871f564641180186469',
      title: 'Math Question',
      description: 'What is 1 + 1?',
      difficulty: 'easy',
    };
    const expectedMediumResult = {
      _id: '615f1871f564641180186469',
      title: 'Math Question',
      description: 'What is 1 * 1?',
      difficulty: 'medium',
    };
    const expectedHardResult = {
      _id: '615f1871f564641180186469',
      title: 'Math Question',
      description: 'What is 1 % 1?',
      difficulty: 'hard',
    };

    it('should find a random easy question if difficulty is easy', async () => {
      questionModel.aggregate.mockResolvedValueOnce([expectedEasyResult]);

      const result = await questionsRepository.find(Difficulty.EASY);

      expect(questionModel.aggregate).toBeCalledWith([
        { $match: { difficulty: Difficulty.EASY } },
        { $sample: { size: 1 } },
      ]);
      expect(result).toStrictEqual(result);
    });

    it('should find a random medium question if difficulty is medium', async () => {
      questionModel.aggregate.mockResolvedValueOnce([expectedMediumResult]);

      const result = await questionsRepository.find(Difficulty.MEDIUM);

      expect(questionModel.aggregate).toBeCalledWith([
        { $match: { difficulty: Difficulty.MEDIUM } },
        { $sample: { size: 1 } },
      ]);
      expect(result).toStrictEqual(result);
    });

    it('should find a random hard question if difficulty is hard', async () => {
      questionModel.aggregate.mockResolvedValueOnce([expectedHardResult]);

      const result = await questionsRepository.find(Difficulty.HARD);

      expect(questionModel.aggregate).toBeCalledWith([
        { $match: { difficulty: Difficulty.HARD } },
        { $sample: { size: 1 } },
      ]);
      expect(result).toStrictEqual(result);
    });

    it('should throw QuestionNotFoundError if no question found', () => {
      questionModel.aggregate.mockResolvedValueOnce([]);

      expect(() => questionsRepository.find(Difficulty.HARD)).rejects.toEqual(
        new QuestionNotFoundError(Difficulty.HARD),
      );
    });
  });
});

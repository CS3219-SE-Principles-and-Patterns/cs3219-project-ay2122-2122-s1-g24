import { Difficulty } from 'src/questions/questions.const';

export class QuestionNotFoundError extends Error {
  constructor(difficulty: Difficulty) {
    super(`Question for ${difficulty} difficulty was not found`);
  }
}

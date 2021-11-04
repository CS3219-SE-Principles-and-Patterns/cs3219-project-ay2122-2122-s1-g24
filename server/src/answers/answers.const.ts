import { Difficulty } from '../questions/questions.const';

export interface AnswerDto {
  title: string;
  description: string;
  difficulty: Difficulty;
  answer: string;
}

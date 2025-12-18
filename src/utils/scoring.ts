import { questions } from '../data/questions';

export function calculateScore(answers: number[]): number {
  let total = 0;

  answers.forEach((answer, index) => {
    const question = questions[index];
    if (question.isReverse) {
      total += 4 - answer;
    } else {
      total += answer;
    }
  });

  return total;
}

export function getCategory(score: number): string {
  if (score <= 13) {
    return 'Rendah';
  } else if (score <= 26) {
    return 'Sedang';
  } else {
    return 'Tinggi';
  }
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case 'Rendah':
      return 'text-green-600 bg-green-50';
    case 'Sedang':
      return 'text-yellow-600 bg-yellow-50';
    case 'Tinggi':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

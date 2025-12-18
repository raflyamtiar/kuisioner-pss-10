export interface Response {
  id: string;
  nama: string;
  answers: number[];
  total_score: number;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: number;
  text: string;
  isReverse: boolean;
}

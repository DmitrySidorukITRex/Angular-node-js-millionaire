export interface IGame {
  rounds: IRound[];
  currentRound: number;
  halfHintAvailable: boolean;
  hallHintAvailable: boolean;
}

export interface IRound {
  question: string;
  answers: string[];
  rightAnswer: string;
  roundNumber: number;
  scores: number;
}

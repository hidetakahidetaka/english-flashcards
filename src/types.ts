
export enum Screen {
  PlayerSelection,
  NameInput,
  Game,
  Result,
  VocabularyList,
}

export interface VocabularyItem {
  english: string;
  japanese: string;
  emoji: string;
}

export interface Player {
  name: string;
  correct: number;
  incorrect: number;
}

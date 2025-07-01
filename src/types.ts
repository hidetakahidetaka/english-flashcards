// Using a string union type instead of enum to avoid build errors with Vite/Vercel.
export type Screen =
  | 'PlayerSelection'
  | 'NameInput'
  | 'Game'
  | 'Result'
  | 'VocabularyList';

export interface VocabularyItem {
  english: string;
  japanese: string;
  emoji: string;
}

export interface Player {
  name: string;
  correct: number;
  incorrect: number;
  incorrectWords: VocabularyItem[];
}

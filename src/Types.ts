export type GridElement = "row" | "column";
export type WordleCategory = "guess" | "almost" | "correct";
export type WordleTry = WordleElement[];

export interface CrosswordElementSelection {
  element: GridElement;
  x: number;
  y: number;
};

export interface WordleElement {
  value: string;
  category: WordleCategory;
}
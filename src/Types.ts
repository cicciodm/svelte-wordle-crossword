type GridElement = "row" | "column";

interface CrosswordElementSelection {
  element: GridElement;
  x: number;
  y: number;
};
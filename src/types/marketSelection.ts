
export interface MarketSelection {
  id: number;
  marketId: number;
  name: string;
  odd: number;
  threshold?: number;
}


export interface MarketSelectionCreateDTO {
  name: string;
  odd: number;
  threshold?: number;
}


export type OneXTwoSelection = "Home" | "Draw" | "Away";
export type OverUnderSelection = "Over" | "Under";
export type TotalCornersSelection = "Over" | "Under";
export type BothToScoreSelection = "Yes" | "No";
import type { MarketSelection } from "./marketSelection";


export type MarketType = "OneXTwo" | "OverUnderGoals" | "TotalCorners" | "BothToScore";


export interface Market {
  id: number;
  matchId: number;
  marketType: MarketType;
  description?: string;
  selections?: MarketSelection[];
}


export interface MarketCreateDTO {
  marketType: MarketType;
  description?: string;
}
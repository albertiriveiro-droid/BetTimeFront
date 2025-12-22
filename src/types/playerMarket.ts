import type { PlayerMarketSelection } from "./playerMarketSelection";


export type PlayerMarketType = "Goal" | "Assist" | "YellowCard" | "RedCard";


export interface PlayerMarket {
  id: number;
  matchId: number;
  playerId: number;
  playerMarketType: PlayerMarketType;
  createdAt: string; 
  isOpen: boolean;
  selections?: PlayerMarketSelection[];
}


export interface PlayerMarketCreateDTO {
  playerId: number;
  playerMarketType: PlayerMarketType;
}
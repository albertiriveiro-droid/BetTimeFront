
export interface Bet {
  id: number;
  userId: number;
  matchId: number;
  marketSelectionId?: number;
  playerMarketSelectionId?: number;
  amount: number;
  won?: boolean;
  placedAt: string; 
}

export interface BetCreateDTO {
  userId: number;
  marketSelectionId?: number;
  playerMarketSelectionId?: number;
  amount: number;
}


export interface BetOutputDTO {
  id: number;
  matchId: number;
  marketType?: string;
  selectionName?: string;
  playerName?: string;
  playerMarketType?: string;
  amountBet: number;
  odds: number;
  won?: boolean;
  amountWon?: number;
  date: string; 
}

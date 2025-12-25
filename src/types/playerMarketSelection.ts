
export interface PlayerMarketSelection {
  id: number;
  playerMarketId: number;
  name: string;
  odd: number;
  threshold?: number;
}


export interface PlayerMarketSelectionCreateDTO {
  name: string;
  odds: number;
}
import type { PlayerMatchStats } from "./playermatchstats";
import type { PlayerMarket } from "./playerMarket";

export type PlayerPosition = "Goalkeeper" | "Defender" | "Midfielder" | "Forward";


export interface Player {
  id: number;
  name: string;
  teamId: number;
  shirtNumber: number;
  position: PlayerPosition;
  isActive: boolean;
  matchStats?: PlayerMatchStats[];
  playerMarkets?: PlayerMarket[];
}


export interface PlayerCreateDTO {
  name: string;
  teamId: number;
  shirtNumber: number;
  position: PlayerPosition;
}

export interface PlayerUpdateDTO {
  name?: string;
  teamId?: number;
  shirtNumber?: number;
  position?: PlayerPosition;
  isActive?: boolean;
}
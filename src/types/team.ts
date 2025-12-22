import type { Player } from "./player";
import type { Match } from "./match";


export interface Team {
  id: number;
  name: string;
  leagueId: number;
  players?: Player[];     
  homeMatches?: Match[];   
  awayMatches?: Match[];   
}


export interface TeamCreateDTO {
  name: string;
  leagueId: number;
}


export interface TeamUpdateDTO {
  name?: string;
  leagueId?: number;
}
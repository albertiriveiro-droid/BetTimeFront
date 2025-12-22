import type { Team } from "./team";
import type { Match } from "./match";


export interface League {
  id: number;
  name: string;
  sportId: number;
  teams?: Team[];    
  matches?: Match[]; 
}


export interface LeagueCreateDTO {
  name: string;
  sportId: number;
}


export interface LeagueUpdateDTO {
  name?: string;
  sportId?: number;
}
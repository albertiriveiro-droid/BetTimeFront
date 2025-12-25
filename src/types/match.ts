import type { Bet } from "./bet";
import type { Market } from "./market";
import type { PlayerMarket } from "./playerMarket";
import type { PlayerMatchStats } from "./playerMatchStats";
import type { Team } from "./team";


export interface Match {
  id: number;
  leagueId: number;
  homeTeamId: number;
  awayTeamId: number;
  startTime: string; 
  homeScore: number;
  awayScore: number;
  homeCorners: number;
  awayCorners: number;
  durationMinutes: number;
  finished: boolean;
  playerMatchStats?: PlayerMatchStats[];
  playerMatchStatsJson?: string;
  bets?: Bet[];
  markets?: Market[];
  playerMarkets?: PlayerMarket[];
  homeTeam?: Team; 
  awayTeam?: Team; 
}


export interface MatchCreateDTO {
  leagueId: number;
  homeTeamId: number;
  awayTeamId: number;
  startTime: string;     
  durationMinutes: number;
}


export interface MatchUpdateDTO {
  startTime?: string;
  homeScore?: number;
  awayScore?: number;
  finished?: boolean;
  durationMinutes?: number;
}

export interface MatchOutputDTO {
  id: number;
  leagueId: number;
  leagueName: string;
  homeTeamId: number;
  homeTeamName: string;
  awayTeamId: number;
  awayTeamName: string;
  startTime: string;
  homeScore: number;
  awayScore: number;
  homeCorners: number;
  awayCorners: number;
  durationMinutes: number;
  finished: boolean;
}
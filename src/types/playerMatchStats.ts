
export interface PlayerMatchStats {
  id: number;
  playerId: number;
  matchId: number;
  goals: number;
  assists: number;
  yellowCard: number;
  redCard: number;
  minutesPlayed: number;
}


export interface PlayerMatchStatsDTO {
  playerId: number;
  matchId: number;
  goals: number;
  assists: number;
  yellowCard: number;
  redCard: number;
  minutesPlayed: number;
}


export interface PlayerMatchStatsUpdateDTO {
  goals?: number;
  assists?: number;
  yellowCard?: number;
  redCard?: number;
  minutesPlayed?: number;
}

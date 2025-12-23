import { http } from "../api/http";
import type { PlayerMatchStatsDTO,PlayerMatchStatsUpdateDTO } from "../types/playermatchstats";

export const playerMatchStatsService = {
  getByPlayerAndMatch: (playerId: number, matchId: number): Promise<PlayerMatchStatsDTO> =>
    http.get(`/playermatchstats/player/${playerId}/match/${matchId}`).then(res => res.data),

  getByMatch: (matchId: number): Promise<PlayerMatchStatsDTO[]> =>
    http.get(`/playermatchstats/match/${matchId}`).then(res => res.data),

  create: (dto: PlayerMatchStatsDTO): Promise<PlayerMatchStatsDTO> =>
    http.post(`/playermatchstats`, dto).then(res => res.data),

  update: (playerId: number, matchId: number, dto: PlayerMatchStatsUpdateDTO): Promise<PlayerMatchStatsDTO> =>
    http.put(`/playermatchstats/player/${playerId}/match/${matchId}`, dto).then(res => res.data),
};
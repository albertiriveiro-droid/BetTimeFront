import { http } from "../api/http";
import type { PlayerMarket,PlayerMarketCreateDTO, PlayerMarketOutputDTO } from "../types/playerMarket";

export const playerMarketService = {
  create: (matchId: number, dto: PlayerMarketCreateDTO): Promise<PlayerMarket> =>
    http.post(`/playermarket/match/${matchId}/playermarket`, dto).then(res => res.data),

  getById: (id: number): Promise<PlayerMarket> =>
    http.get(`/playermarket/${id}`).then(res => res.data),


  getByMatch: (matchId: number): Promise<PlayerMarket[]> =>
    http.get(`/playermarket/bymatch/${matchId}`).then(res => res.data),

  getByMatchDetails: (matchId: number): Promise<PlayerMarketOutputDTO[]> =>
    http.get(`/playermarket/bymatch/details/${matchId}`).then(res => res.data),
};
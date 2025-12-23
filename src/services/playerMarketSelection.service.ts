import { http } from "../api/http";
import type { PlayerMarketSelection, PlayerMarketSelectionCreateDTO } from "../types/playerMarketSelection";

export const playerMarketSelectionService = {
  create: (playerMarketId: number, dto: PlayerMarketSelectionCreateDTO): Promise<PlayerMarketSelection> =>
    http.post(`/playermarketselection/matchplayermarket/${playerMarketId}/selection`, dto).then(res => res.data),

  getById: (id: number): Promise<PlayerMarketSelection> =>
    http.get(`/playermarketselection/${id}`).then(res => res.data),

  getByPlayerMarket: (playerMarketId: number): Promise<PlayerMarketSelection[]> =>
    http.get(`/playermarketselection/bymarket/${playerMarketId}`).then(res => res.data),
};
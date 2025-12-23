import { http } from "../api/http";
import type { MarketSelection,MarketSelectionCreateDTO } from "../types/marketSelection";

export const marketSelectionService = {
  create: (marketId: number, dto: MarketSelectionCreateDTO): Promise<MarketSelection> =>
    http.post(`/markets/${marketId}/selections`, dto).then(res => res.data),

  getByMarket: (marketId: number): Promise<MarketSelection[]> =>
    http.get(`/markets/${marketId}/selections`).then(res => res.data),

  getById: (selectionId: number): Promise<MarketSelection> =>
    http.get(`/selections/${selectionId}`).then(res => res.data),
};
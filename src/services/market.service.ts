import { http } from "../api/http";
import type { Market,MarketCreateDTO } from "../types/market";

export const marketService = {
  getById: (marketId: number): Promise<Market> => 
    http.get(`/market/${marketId}`).then(res => res.data),

  getByMatch: (matchId: number): Promise<Market[]> => 
    http.get(`/market/match/${matchId}`).then(res => res.data),
  
  getOneXTwoByMatch: (matchId: number) =>
    http.get(`/market/match/${matchId}/onextwo`).then(res => res.data),


  create: (matchId: number, dto: MarketCreateDTO): Promise<Market> => 
    http.post(`/market/match/${matchId}`, dto).then(res => res.data)
};
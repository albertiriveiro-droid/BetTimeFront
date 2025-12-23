import { http } from "../api/http";
import type { Bet,BetCreateDTO } from "../types/bet";

export const betService = {
  
  getAll(): Promise<Bet[]> {
    return http.get("/bet").then(res => res.data);
  },

  getById(betId: number): Promise<Bet> {
    return http.get(`/bet/${betId}`).then(res => res.data);
  },

  getByUser(userId: number): Promise<Bet[]> {
    return http.get(`/bet/user/${userId}`).then(res => res.data);
  },

  getByMatch(matchId: number): Promise<Bet[]> {
    return http.get(`/bet/match/${matchId}`).then(res => res.data);
  },

  getActiveByUser(userId: number): Promise<Bet[]> {
    return http.get(`/bet/active/${userId}`).then(res => res.data);
  },

  getFinishedByUser(userId: number): Promise<Bet[]> {
    return http.get(`/bet/finished/${userId}`).then(res => res.data);
  },

  getWonByUser(userId: number): Promise<Bet[]> {
    return http.get(`/bet/won/${userId}`).then(res => res.data);
  },

  getLostByUser(userId: number): Promise<Bet[]> {
    return http.get(`/bet/lost/${userId}`).then(res => res.data);
  },

 
  create(dto: BetCreateDTO): Promise<Bet> {
    return http.post("/bet", dto).then(res => res.data);
  },

 
  resolve(betId: number): Promise<Bet> {
    return http.put(`/bet/resolve/${betId}`).then(res => res.data);
  },

  resolveForMatch(matchId: number): Promise<void> {
    return http.put(`/bet/resolve/match/${matchId}`).then(res => res.data);
  },
};
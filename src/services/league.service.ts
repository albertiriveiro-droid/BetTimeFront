import { http } from "../api/http";
import type { League,LeagueCreateDTO,LeagueUpdateDTO } from "../types/league";

export const leagueService = {
  
  getAll(): Promise<League[]> {
    return http.get("/league").then(res => res.data);
  },

  
  getById(leagueId: number): Promise<League> {
    return http.get(`/league/${leagueId}`).then(res => res.data);
  },

  
  getBySport(sportId: number): Promise<League[]> {
    return http.get(`/league/bySport/${sportId}`).then(res => res.data);
  },

 
  create(dto: LeagueCreateDTO): Promise<League> {
    return http.post("/league", dto).then(res => res.data);
  },

  // ADMIN
  update(leagueId: number, dto: LeagueUpdateDTO): Promise<void> {
    return http.put(`/league/${leagueId}`, dto).then(res => res.data);
  },

  // ADMIN
  delete(leagueId: number): Promise<void> {
    return http.delete(`/league/${leagueId}`).then(res => res.data);
  },
};
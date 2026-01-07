import { http } from "../api/http";
import type { Match, MatchCreateDTO, MatchUpdateDTO, MatchOutputDTO } from "../types/match";

export const matchService = {
  
  getAll(): Promise<MatchOutputDTO[]> {
  return http.get("/match").then(res => res.data);
},
  getById(matchId: number): Promise<MatchOutputDTO> {
    return http.get(`/match/${matchId}`).then(res => res.data);
  },

  getByLeague(leagueId: number): Promise<MatchOutputDTO[]> {
    return http.get(`/match/byLeague/${leagueId}`).then(res => res.data);
  },

  getByTeam(teamId: number): Promise<MatchOutputDTO[]> {
  return http.get(`/match/byTeam/${teamId}`).then(res => res.data);
  },

 
  create(dto: MatchCreateDTO): Promise<Match> {
    return http.post("/match", dto).then(res => res.data);
  },

  update(matchId: number, dto: MatchUpdateDTO): Promise<void> {
    return http.put(`/match/${matchId}`, dto).then(res => res.data);
  },

  delete(matchId: number): Promise<void> {
    return http.delete(`/match/${matchId}`).then(res => res.data);
  },
};

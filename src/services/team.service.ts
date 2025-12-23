import { http } from "../api/http";
import type { Team,TeamCreateDTO,TeamUpdateDTO } from "../types/team";

export const teamService = {
 
  getAll(): Promise<Team[]> {
    return http.get("/team").then(res => res.data);
  },

  
  getById(teamId: number): Promise<Team> {
    return http.get(`/team/${teamId}`).then(res => res.data);
  },


  getByLeague(leagueId: number): Promise<Team[]> {
    return http
      .get(`/team/byLeague/${leagueId}`)
      .then(res => res.data);
  },

  
  create(dto: TeamCreateDTO): Promise<Team> {
    return http.post("/team", dto).then(res => res.data);
  },

  
  update(teamId: number, dto: TeamUpdateDTO): Promise<void> {
    return http.put(`/team/${teamId}`, dto).then(res => res.data);
  },

 
  delete(teamId: number): Promise<void> {
    return http.delete(`/team/${teamId}`).then(res => res.data);
  },
};
import { http } from "../api/http";
import type { Player,PlayerCreateDTO,PlayerUpdateDTO } from "../types/player";

export const playerService = {
 
  getById(playerId: number): Promise<Player> {
    return http.get(`/player/${playerId}`).then(res => res.data);
  },

  getByTeam(teamId: number): Promise<Player[]> {
    return http.get(`/player/team/${teamId}`).then(res => res.data);
  },

 
  create(dto: PlayerCreateDTO): Promise<Player> {
    return http.post("/player", dto).then(res => res.data);
  },

  update(playerId: number, dto: PlayerUpdateDTO): Promise<Player> {
    return http.put(`/player/${playerId}`, dto).then(res => res.data);
  },

  delete(playerId: number): Promise<void> {
    return http.delete(`/player/${playerId}`).then(res => res.data);
  },
};
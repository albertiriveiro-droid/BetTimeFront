import { http } from "../api/http";
import type { Sport, SportUpdateDTO, SportCreateDTO } from "../types/sport";

export const sportService = {
 
    
  getAll(): Promise<Sport[]> {
    return http.get("/sport").then(res => res.data);
  },

 
  getById(sportId: number): Promise<Sport> {
    return http.get(`/sport/${sportId}`).then(res => res.data);
  },

  create(dto: SportCreateDTO): Promise<Sport> {
    return http.post("/sport", dto).then(res => res.data);
  },

 
  update(sportId: number, dto: SportUpdateDTO): Promise<void> {
    return http.put(`/sport/${sportId}`, dto).then(res => res.data);
  },

  delete(sportId: number): Promise<void> {
    return http.delete(`/sport/${sportId}`).then(res => res.data);
  },
};
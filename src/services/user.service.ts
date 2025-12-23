import { http } from "../api/http";
import type { User, UserUpdateDTO } from "../types/user";

export const userService = {
  // 🔒 ADMIN
  getAll(): Promise<User[]> {
    return http.get("/user").then(res => res.data);
  },


  getByEmail(email: string): Promise<User> {
    return http.get("/user/byEmail", {
      params: { email },
    }).then(res => res.data);
  },

  
  getById(userId: number): Promise<User> {
    return http.get(`/user/${userId}`).then(res => res.data);
  },

  
  update(userId: number, dto: UserUpdateDTO): Promise<void> {
    return http.put(`/user/${userId}`, dto).then(res => res.data);
  },

 
  delete(userId: number): Promise<void> {
    return http.delete(`/user/${userId}`).then(res => res.data);
  },
};
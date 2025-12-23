import { http } from "../api/http";
import type { UserCreateDTO, LoginDTO } from "../types/user";

export const authService = {
  register: (dto: UserCreateDTO) =>
    http.post("/auth/register", dto).then(res => res.data),

  login: (dto: LoginDTO) =>
    http.post("/auth/login", dto).then(res => res.data),
};
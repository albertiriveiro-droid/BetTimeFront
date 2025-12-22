import type { Bet } from "./bet";
import type { Transaction } from "./transaction";


export type UserRole = "admin" | "user";


export interface User {
  id: number;
  username: string;
  email: string;
  password?: string; 
  balance: number;
  createdAt: string; 
  role: UserRole;
  transactions?: Transaction[];
  bets?: Bet[];
}


export interface LoginDTO {
  email: string;
  password: string;
}


export interface UserCreateDTO {
  username: string;
  email: string;
  password: string;
}


export interface UserUpdateDTO {
  username?: string;
  email?: string;
  password?: string;
}

import type { League } from "./league";

export interface Sport {
  id: number;
  name: string;
  leagues?: League[]; 
}


export interface SportCreateDTO {
  name: string;
}


export interface SportUpdateDTO {
  name?: string;
}
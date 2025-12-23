import { http } from "../api/http";
import type { Transaction, TransactionCreateDTO } from "../types/transaction";

export const transactionService = {
 
  create(dto: TransactionCreateDTO): Promise<Transaction> {
    return http.post("/transaction", dto).then(res => res.data);
  },


  getAll(): Promise<Transaction[]> {
    return http.get("/transaction").then(res => res.data);
  },

 
  getById(transactionId: number): Promise<Transaction> {
    return http.get(`/transaction/${transactionId}`).then(res => res.data);
  },

 
  getByUser(userId: number): Promise<Transaction[]> {
    return http
      .get(`/transaction/user/${userId}`)
      .then(res => res.data);
  },
};


export interface Transaction {
  id: number;
  userId: number;
  amount: number;      
  type: string;
  paymentMethod?: string;
  date: string;       
  note?: string;
}


export interface TransactionCreateDTO {
  userId: number;
  amount: number;
  type: string;
  paymentMethod?: string;
}
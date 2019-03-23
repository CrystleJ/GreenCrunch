import { Bank } from "./bank";

export class Transaction {
  id: number;
  type: String;
  amount: number;
  category: String;
  item: String;
  date_time: Date;
  bank: Bank;
}

import { Wallet } from "./wallet";

export interface Category {
  _id: string;
  name: string;
  wallet: Wallet | null;
  createdAt: string | null;
  updatedAt: string | null;
}

import { Expense } from "./expense.interface"

export interface ResponseCli {
  success: boolean,
  message: string,
  expense?: Expense
} 
export interface Expense {
  id?: number,
  description: string,
  category: string,
  amount: number,
  date?: string
}

export interface ResponseCLI {
  success: boolean,
  message: string,
  expense?: Expense
} 

export type UpdatableExpenseFields = 'description' | 'category' | 'amount';
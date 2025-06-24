export interface Expense {
  id?: number,
  description: string,
  amount: number,
  date?: string
}

export type UpdatableExpenseFields = 'description' | 'amount';

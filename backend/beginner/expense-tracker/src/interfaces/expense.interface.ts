export interface Expense {
  id?: number,
  description: string,
  category: string,
  amount: number,
  date?: string
}

export type UpdatableExpenseFields = 'description' | 'category' | 'amount';
export type UpdatableFlags = '--description' | '--category' | '--amount';
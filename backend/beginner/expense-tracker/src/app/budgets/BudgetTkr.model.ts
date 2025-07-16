import { promises as fs, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createDataBase, getCurrentDateFormat } from '../utils/main.util';

export default class BudgetTkrModel {
  private static __filename = fileURLToPath(import.meta.url);
  private static __dirname = dirname(BudgetTkrModel.__filename); 
  public static dataPath: string = resolve(BudgetTkrModel.__dirname, '..', '..', '..', 'db', 'budgets.json');

  static async addBudget(budget: number, month: number): Promise<void> {}
  static async updateBudget(budget: number, month: number): Promise<void> {}
  static async listBudgets(month?: number): Promise<void> {}
  static async deleteBudgets(month: number): Promise<void> {}
}
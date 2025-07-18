import { promises as fs, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { exportCsvFile } from "../utils/main.util";
import { Expense } from '../../interfaces/expense.interface';
import { Budget } from '../../interfaces/budgets.interface';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPathExpenses: string = resolve(__dirname, '..', '..', '..', 'db', 'expenses.json');
const dbPathBudgets: string = resolve(__dirname, '..', '..', '..', 'db', 'budgets.json');

export async function createCsvFile(): Promise<void> {
    if (!existsSync(dbPathExpenses)) throw new Error('No expenses database');
    if (!existsSync(dbPathBudgets)) throw new Error('No budgets database');
  
    const dataExpenses = await fs.readFile(dbPathExpenses, 'utf-8'),
          dataBudgets = await fs.readFile(dbPathBudgets, 'utf-8');

    const convertDataExpenses: Expense[] = dataExpenses ? JSON.parse(dataExpenses) : [],
          convertDataBudgets: Budget[] = dataBudgets ? JSON.parse(dataBudgets) : [];

    const bodyDataExpense: string[][] = [],
          bodyDataBudget: string[][] = [];
          
          
    const generateBodyData = (data: (Expense | Budget)[]): string[][] => {
      let bodyData: string[][] = [],
          row: string[] = [];

      for (let obj of data) {
        for (let [, value] of Object.entries(obj))
          row.push(value);

        bodyData.push(row);
        row = [];
      }

      return bodyData;
    }

    bodyDataExpense.push(...generateBodyData(convertDataExpenses));
    bodyDataBudget.push(...generateBodyData(convertDataBudgets));

    exportCsvFile('expenses', bodyDataExpense, ['id', 'description', 'category', 'amount', 'date']);
    exportCsvFile('budgets', bodyDataBudget, ['budget', 'month']);
}
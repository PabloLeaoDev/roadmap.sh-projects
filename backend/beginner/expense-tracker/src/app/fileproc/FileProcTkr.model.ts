import { promises as fs, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { exportCsvFile } from "../utils/main.util";
import { Expense } from '../../interfaces/expense.interface';
import { Budget } from '../../interfaces/budgets.interface';

type ExpenseKeys = 'id' |'description' | 'category' | 'amount' | 'date';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataPathExpenses: string = resolve(__dirname, '..', '..', '..', 'db', 'expenses.json');
const dataPathBudgets: string = resolve(__dirname, '..', '..', '..', 'db', 'budgets.json');

async function concatData(): Promise<void> {
    // if (!existsSync(dataPathExpenses)) throw new Error();
    // if (!existsSync(dataPathBudgets)) throw new Error();
  
    const dataExpenses = await fs.readFile(dataPathExpenses, 'utf-8'),
          dataBudgets = await fs.readFile(dataPathBudgets, 'utf-8');

    const convertDataExpenses: Expense[] = dataExpenses ? JSON.parse(dataExpenses) : [],
          convertDataBudgets: Budget[] = dataBudgets ? JSON.parse(dataBudgets) : [];

    const bodyData: string[][] = [];
    let row: string[] = [];

    for (let expense of convertDataExpenses) {
      for (let key of Object.keys(expense)) {
        // row.push(expense[(key as ExpenseKeys)]);
      }
    }
}

export async function createCsvFile(): Promise<void> {
}
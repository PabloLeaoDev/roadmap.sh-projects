import { promises as fs, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createDataBase } from '../utils/main.util';
import { Budget } from '../../interfaces/budgets.interface';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 
const dataPath: string = resolve(__dirname, '..', '..', '..', 'db', 'budgets.json');

export async function addBudget(budget: number, month: number): Promise<void> {
  if (!existsSync(dataPath)) await createDataBase('[]', dataPath);

  const data = await fs.readFile(dataPath, 'utf-8'),
        convertData = data ? JSON.parse(data) : [];

  const budgetDict = { budget, month };
  
  const concatData = [...convertData, budgetDict], 
        reconvertData = JSON.stringify(concatData);

  if (reconvertData) await createDataBase(reconvertData, dataPath);
}

export async function updateBudget(budget: number, month: number): Promise<void> {
  if (!existsSync(dataPath)) throw new Error('No database');
  
  const data = await fs.readFile(dataPath, 'utf-8'),
        convertData = data ? JSON.parse(data) : null;

  if (!convertData) throw new Error('No data to be updated');

  let isBudgetExists = false;
  for (let bdg of convertData as Budget[]) {
    if (bdg.month === month) isBudgetExists = true;
  }

  if (!isBudgetExists) throw new Error('This budget do not exists in database');

  const newConvertData = (convertData as Budget[]).map((bdg) => {
    if (bdg && bdg.month === month) bdg.budget = budget;
    return bdg;
  });

  const reconvertData = JSON.stringify([...newConvertData]);

  await createDataBase(reconvertData, dataPath);
}

export async function listBudgets(month?: number): Promise<void> {
  const data = await fs.readFile(dataPath, 'utf-8'),
              convertData: Budget[] | null = data ? JSON.parse(data) : null;
  
  if (!convertData) {
    console.log('No tasks in database!');
    return;
  }

  console.log(`-------------------------------------`);
  console.log('# Budget  Month');
  console.log(`-------------------------------------`);

  const budgetConsoleLog = (budget: Budget) => {
    console.log(`# ${budget.budget}    ${budget.month}`);
    console.log(`-------------------------------------`);
  }

  if (month) {
    for (let budget of convertData) {
      if (budget.month === month) budgetConsoleLog(budget);
    }
  } else {
    for (let budget of convertData) budgetConsoleLog(budget);
  }
}

export async function deleteBudgets(month?: number): Promise<void> {
  if (!existsSync(dataPath)) throw new Error('No database');;
  
  const data = await fs.readFile(dataPath, 'utf-8');
  let convertData = data ? JSON.parse(data) : null;

  if (!convertData) throw new Error('No data to be deleted');

  if (month) {
    (convertData as Budget[]).map((budget, i) => {
      if (budget && (budget.month === month)) {
        convertData.splice(i, 1);
        return null;
      }
      
      return budget;
    });
  } else convertData = [];

  const reconvertData = JSON.stringify([...convertData]);

  if (reconvertData) await createDataBase(reconvertData, dataPath);
  
}
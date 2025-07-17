import { promises as fs, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createDataBase, getCurrentDateFormat } from '../utils/main.util';
import { Expense, UpdatableExpenseFields } from '../../interfaces/expense.interface';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 
const dataPath: string = resolve(__dirname, '..', '..', '..', 'db', 'expenses.json');

export async function listExpenses(month?: number, category?: string): Promise<void> {
  const data = await fs.readFile(dataPath, 'utf-8'),
        convertData: Expense[] | null = data ? JSON.parse(data) : null;

  if (!convertData) {
    console.log('No tasks in database!');
    return;
  }

  console.log(`-------------------------------------`);
  console.log('# ID  Date       Description  Category  Amount');
  console.log(`-------------------------------------`);

  const expenseConsoleLog = (expense: Expense) => {
    console.log(`# ${expense.id}   ${expense.date}  ${expense.description}     ${expense.category}      $${expense.amount}`);
    console.log(`-------------------------------------`);
  }

  let expenseMonth = 0;

  if (!month && !category) {
    for (let expense of convertData) expenseConsoleLog(expense);
  } else if (month && !category) {
    for (let expense of convertData) {
      expenseMonth = Number(expense.date?.split('/')[1]);

      if (expenseMonth === month) expenseConsoleLog(expense);
    } 
  } else if (!month && category) {
    for (let expense of convertData)
      if (expense.category === category) expenseConsoleLog(expense);
  } else {
    for (let expense of convertData) {
      expenseMonth = Number(expense.date?.split('/')[1]);

      if (expenseMonth === month && expense.category === category) expenseConsoleLog(expense);
    }
  }
}

export async function addExpense(expense: Expense): Promise<{ id: number, expense: Expense }> {
  if (!existsSync(dataPath)) await createDataBase('[]', dataPath);

  const data = await fs.readFile(dataPath, 'utf-8'),
        convertData = data ? JSON.parse(data) : [];

  let id = 1;

  if (convertData.length > 0) 
    id = convertData[convertData.length - 1].id + 1;

  expense = { id, ...expense, date: getCurrentDateFormat() };
  
  const concatData = [...convertData, expense], 
        reconvertData = JSON.stringify(concatData);

  if (reconvertData) await createDataBase(reconvertData, dataPath);

  return { id, expense };
}

export async function updateExpense(id: number, fields: { description?: string, category?: string, amount?: number }): Promise<{ expense: Expense }> {
  if (!existsSync(dataPath)) throw new Error('No database');

  const data = await fs.readFile(dataPath, 'utf-8'),
        convertData = data ? JSON.parse(data) : null;

  if (!convertData) throw new Error('No data to be updated');

  let isExpenseExists = false;
  for (let expense of convertData as Expense[]) {
    if (expense.id === id) isExpenseExists = true;
  }

  if (!isExpenseExists) throw new Error('This expense do not exists in database');

  let targetExpense: Expense = { id: 0, description: '', category: '', amount: 0, date: '' };

  const newConvertData = (convertData as Expense[]).map((expense) => {
    if (expense && expense.id === id) {
      for (let field in fields) {
        const key = field as UpdatableExpenseFields,
              value = fields[key];

        if (key === 'description' && typeof value === 'string' && value) expense.description = value;
        else if (key === 'category' && typeof value === 'string' && value) expense.category = value;
        else if (key === 'amount' && typeof value === 'number' && value) expense.amount = value;
      }

      expense.date = getCurrentDateFormat();
      targetExpense = expense;
    }

    return expense;
  });

  const reconvertData = JSON.stringify([...newConvertData]);

  await createDataBase(reconvertData, dataPath);

  return { expense: targetExpense };
}

export async function deleteExpenses(id?: number): Promise<{ expense: Expense }> {
  if (!existsSync(dataPath)) throw new Error('No database');;

  const data = await fs.readFile(dataPath, 'utf-8');
  let convertData = data ? JSON.parse(data) : null;

  if (!convertData) throw new Error('No data to be deleted');

  let targetExpense: Expense = { id: 0, description: '', category: '', amount: 0, date: '' };

  if (id) {
    (convertData as Expense[]).map((expense, i) => {
      if (expense && (expense.id === id)) {
        convertData.splice(i, 1);
        return null;
      }
      
      targetExpense = expense;

      return expense;
    });
  } else convertData = [];

  const reconvertData = JSON.stringify([...convertData]);

  if (reconvertData) await createDataBase(reconvertData, dataPath);

  return { expense: targetExpense };
}
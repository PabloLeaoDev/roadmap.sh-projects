import { Expense, UpdatableExpenseFields } from './interfaces/expense.interface';
import { promises as fs, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createDataBase, getCurrentDateFormat } from './utils/main.util';

export default class ExpenseTkrModel {
  private static __filename = fileURLToPath(import.meta.url);
  private static __dirname = dirname(ExpenseTkrModel.__filename); 
  public static dataPath: string = resolve(ExpenseTkrModel.__dirname, 'db', 'data.json');

  static async listExpenses(month?: number): Promise<void> {
    try {
      const data = await fs.readFile(ExpenseTkrModel.dataPath, 'utf-8'),
            convertData = data ? JSON.parse(data) : null;

      if (!convertData) {
        console.log('No tasks in database!');
        return;
      }

      console.log('# ID  Date       Description  Amount');
      for (let expense of convertData) {
        console.log(`# ${expense.id}   ${expense.date}  ${expense.description}        $${expense.amount}`);
        console.log(`----------------------------------`);
      }
    } catch (err) {
      (err as Error).message = 'Error listing expenses. No data found! Please create a expense first.';
      console.error(err);
    }
  }

  static async addExpense(expense: Expense): Promise<void> {
    try {
      if (!existsSync(ExpenseTkrModel.dataPath)) await createDataBase('[]', ExpenseTkrModel.dataPath);

      const data = await fs.readFile(ExpenseTkrModel.dataPath, 'utf-8'),
            convertData = data ? JSON.parse(data) : [];

      let id = 1;

      if (convertData.length > 0) 
        id = convertData[convertData.length - 1].id + 1;

      expense = { id, ...expense, date: getCurrentDateFormat() };
      
      const concatData = [...convertData, expense], 
            reconvertData = JSON.stringify(concatData);

      if (reconvertData) createDataBase(reconvertData, ExpenseTkrModel.dataPath);

      console.log(`Expense added successfully (ID: ${id})`);
    } catch (err) {
      console.error(err);
    }
  }

  static async updateExpense(id: number, fields: { description?: string, amount?: number }): Promise<void> {
    if (!existsSync(ExpenseTkrModel.dataPath)) return;

    try {
      const data = await fs.readFile(ExpenseTkrModel.dataPath, 'utf-8'),
            convertData = data ? JSON.parse(data) : null;

      if (!convertData) {
        console.log('No data to be updated!');
        return;
      }

      let isTaskExists = false;
      for (let task of convertData) {
        if (task.id === id) isTaskExists = true;
      }

      if (!isTaskExists) throw new Error('This task do not exists in database!');

      const newConvertData = (convertData as Expense[]).map((expense) => {
        if (expense && expense.id === id) {
          for (let field in fields) {
            const key = field as UpdatableExpenseFields,
                  value = fields[key];

            if (key === 'description' && typeof value === 'string') expense.description = value;
            else if (key === 'amount' && typeof value === 'number') expense.amount = value;

            expense.date = getCurrentDateFormat();
          }
        }

        return expense;
      });

      const reconvertData = JSON.stringify([...newConvertData]);

      await createDataBase(reconvertData, ExpenseTkrModel.dataPath);
    } catch (err) {
      console.error(err);
    }
  }

  static async deleteExpense(id: number): Promise<void> {
    if (!existsSync(ExpenseTkrModel.dataPath)) return;

    try {
      const data = await fs.readFile(ExpenseTkrModel.dataPath, 'utf-8'),
            convertData = data ? JSON.parse(data) : null;

      if (!convertData) {
        console.log('No data to be deleted!');
        return;
      }

      (convertData as Expense[]).map((expense, i) => {
        if (expense && expense.id === id) {
          console.log(convertData.splice(i, 1));
          
          return null;
        }
        
        return expense;
      });

      const reconvertData = JSON.stringify([...convertData]);

      if (reconvertData) createDataBase(reconvertData, ExpenseTkrModel.dataPath);
    } catch (err) {
      console.error(err);
    }
  }
}
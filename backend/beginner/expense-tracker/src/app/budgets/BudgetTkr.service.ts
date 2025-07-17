import { ResponseCli } from "../../interfaces/generic.interface";
import BudgetTkrModel from "./BudgetTkr.model";

export default class BudgetTkrService {
  static async toAddMonthBudget(args: string[]): Promise<ResponseCli> {
    try {
      if (args.length !== 5) throw new Error('Please use a valid number of args');

      const budget = Number(args[2]);

      if (args[3] !== '--month') throw new Error('Please use the "--month" option');
      if (!budget) throw new Error('You have not set a valid budget to the month');

      const month = Number(args[4]);

      if (!month) throw new Error('You have not set a valid month to the budget');
      if ((month < 1) && (month > 12)) throw new Error('The month must be between 1 and 12');

      await BudgetTkrModel.addBudget(budget, month);

      return { success: true, message: `` }
    } catch (error) {
      return { success: true, message: (error as Error).message }
    }
  }

  static async toUpdateBudget(args: string[]): Promise<ResponseCli> {
    try {
      if (args.length !== 5) throw new Error('Please use a valid number of args');

      const budget = Number(args[2]);

      if (!budget) throw new Error('You have not set a valid budget to the month');
      if (args[3] !== '--month') throw new Error('Please use the "--month" option');

      const month = Number(args[4]);

      if (!month) throw new Error('You have not set a valid month to the budget');
      if ((month < 1) && (month > 12)) throw new Error('The month must be between 1 and 12');

      await BudgetTkrModel.updateBudget(budget, month);

      return { success: true, message: `` };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  static async toListAllBudgets(): Promise<ResponseCli | void> {
    try {
      await BudgetTkrModel.listBudgets();
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  static async toListBudgetWithFilter(args: string[]): Promise<ResponseCli | void> {
    try {
      if (args.length !== 3) throw new Error('Please use a valid number of args');

      const month = Number(args[2]);

      if (!month) throw new Error('You have not set a month to the summary');
      if ((month < 1) && (month > 12)) throw new Error('The month must be between 1 and 12');
  
      await BudgetTkrModel.listBudgets(month);
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  static async toDeleteBudgets(args: string[]): Promise<ResponseCli | void> {
    try {
      if (args.length !== 3) throw new Error('Please use a valid number of args');

      const month = Number(args[2]);

      if (!month) throw new Error('You have not set a month to the summary');
      if ((month < 1) && (month > 12)) throw new Error('The month must be between 1 and 12');

      await BudgetTkrModel.deleteBudgets(month);
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }
}
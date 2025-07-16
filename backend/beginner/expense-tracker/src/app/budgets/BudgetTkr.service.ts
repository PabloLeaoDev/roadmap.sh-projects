import { ResponseCli } from "../../interfaces/generic.interface";
import BudgetTkrModel from "./BudgetTkr.model";

export default class BudgetTkrService {
  static async toAddMonthBudget(args: string[]): Promise<ResponseCli> {
    try {
      if (args.length !== 5) throw new Error();

      const budget = Number(args[2]);

      if (args[3] !== '--month') throw new Error();
      if (!budget) throw new Error();

      const month = Number(args[4]);

      if (!month) throw new Error();
      if ((month < 1) && (month > 12)) throw new Error();

      await BudgetTkrModel.addBudget(budget, month);

      return { success: true, message: `` }
    } catch (error) {
      return { success: true, message: (error as Error).message }
    }
  }

  static async toUpdateBudget(args: string[]): Promise<ResponseCli> {
    try {
      if (args.length !== 5) throw new Error();

      const budget = Number(args[2]);

      if (!budget) throw new Error();
      if (args[3] !== '--month') throw new Error();

      const month = Number(args[4]);

      if (!month) throw new Error();
      if ((month < 1) && (month > 12)) throw new Error();

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
      if (args.length !== 3) throw new Error();

      const month = Number(args[2]);

      if (!month) throw new Error();
      if ((month < 1) && (month > 12)) throw new Error();
  
      await BudgetTkrModel.listBudgets(month);
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  static async toDeleteBudgets(args: string[]): Promise<ResponseCli | void> {
    try {
      if (args.length !== 3) throw new Error();

      const month = Number(args[2]);

      if (!month) throw new Error();
      if ((month < 1) && (month > 12)) throw new Error();

      await BudgetTkrModel.deleteBudgets(month);
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }
}
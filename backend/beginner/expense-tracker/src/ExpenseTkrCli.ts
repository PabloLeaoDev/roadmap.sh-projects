#!/usr/bin/env node

import ExpenseTkrService from "./ExpenseTkrService";
import { ResponseCLI } from "./interfaces/expense.interface"; 

export default class ExpenseTkrCli {
  private static args: string[];

  constructor() {
    const cleanArgs = process.argv.slice(2);

    ExpenseTkrCli.args = cleanArgs;

    ExpenseTkrCli.cliOptions();
  }

  static getArgs(): string[] {
    return ExpenseTkrCli.args;
  }

  static setArgs(args: string[]): void {
    ExpenseTkrCli.args = args;
  }

  static async cliOptions(): Promise<ResponseCLI | void> {
    try {
      let res: ResponseCLI | void = undefined;

      switch (ExpenseTkrCli.args[0]) {
        case 'add':
          res = await ExpenseTkrService.toAddExpense(ExpenseTkrCli.args);
          break;
        case 'update':
          res = await ExpenseTkrService.toUpdateDescriptionExpense(ExpenseTkrCli.args);
          break;
        case 'delete':
          res = await ExpenseTkrService.toDeleteExpenses(ExpenseTkrCli.args);
          break;
        case 'list':
          res = await ExpenseTkrService.toListAllExpenses();
          break;
        case 'summary':
          res = await ExpenseTkrService.toListExpenseWithFilter(ExpenseTkrCli.args);
          break;
        default:
          throw new Error('This option does not exists');
      }

      if (res) {
        console.log(res);
        return res;
      }
    } catch (error) {
      console.log({ success: false, message: (error as Error).message });
    }
  } 
}

new ExpenseTkrCli();
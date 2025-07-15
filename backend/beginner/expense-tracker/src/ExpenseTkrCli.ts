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
      if (!['add', 'update', 'delete', 'list', 'summary'].includes(ExpenseTkrCli.args[0]))
        throw new Error('This option does not exists');

      let res: ResponseCLI | void = undefined;

      switch (ExpenseTkrCli.args[0]) {
        case 'add':
          res = await ExpenseTkrService.toAddExpense(ExpenseTkrCli.args);
          break;
        case 'update':
          res = await ExpenseTkrService.toUpdateDescriptionExpense(ExpenseTkrCli.args);
          break;
        case 'delete':
          res = await ExpenseTkrService.toDeleteExpense(ExpenseTkrCli.args);
          break;
        case 'list':
          res = await ExpenseTkrService.toListAllExpenses();
          break;
        case 'summary':
          res = await ExpenseTkrService.toListExpenseWithFilter(ExpenseTkrCli.args);
          break;
      }

      if (res) {
        console.log(res);
        return res;
      }
  } 
}

new ExpenseTkrCli();
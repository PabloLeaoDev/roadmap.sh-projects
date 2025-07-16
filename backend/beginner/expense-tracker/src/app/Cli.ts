#!/usr/bin/env node

import ExpenseTkrService from './expenses/ExpenseTkr.service';
import { ResponseCli } from '../interfaces/generic.interface';

export default class Cli {
  private static args: string[];

  constructor() {
    const cleanArgs = process.argv.slice(2);

    Cli.args = cleanArgs;

    Cli.cliOptions();
  }

  static getArgs(): string[] {
    return Cli.args;
  }

  static setArgs(args: string[]): void {
    Cli.args = args;
  }

  static async cliOptions(): Promise<ResponseCli | void> {
    try {
      let res: ResponseCli | void = undefined;

      switch (Cli.args[0]) {
        case 'add':
          if (Cli.args[1] === 'budget') 
            res = await ExpenseTkrService.toAddMonthBudget(Cli.args);
          else
            res = await ExpenseTkrService.toAddExpense(Cli.args);
          break;
        case 'update':
          res = await ExpenseTkrService.toUpdateExpense(Cli.args);
          break;
        case 'delete':
          res = await ExpenseTkrService.toDeleteExpenses(Cli.args);
          break;
        case 'list':
          res = await ExpenseTkrService.toListAllExpenses();
          break;
        case 'summary':
          res = await ExpenseTkrService.toListExpenseWithFilter(Cli.args);
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

new Cli();
#!/usr/bin/env node

import * as ExpenseTkrService from './expenses/ExpenseTkr.service';
import * as BudgetTkrService from './budgets/BudgetTkr.service';
import * as FileProcTkrService from './fileproc/FileProcTkr.service';
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
      const isBudget = (Cli.args[1] === 'budget');
      let res: ResponseCli | void = undefined;

      switch (Cli.args[0]) {
        case 'add':
          res = isBudget ? 
            await BudgetTkrService.toAddMonthBudget(Cli.args) : await ExpenseTkrService.toAddExpense(Cli.args);
          break;
        case 'update':
          res = isBudget ? 
            await BudgetTkrService.toAddMonthBudget(Cli.args) : await ExpenseTkrService.toUpdateExpense(Cli.args);
          break;
        case 'delete':
          res = isBudget ? 
            await BudgetTkrService.toAddMonthBudget(Cli.args) : await ExpenseTkrService.toDeleteExpenses(Cli.args);
          break;
        case 'list':
          res = isBudget ? 
            await BudgetTkrService.toAddMonthBudget(Cli.args) : await ExpenseTkrService.toListAllExpenses();
          break;
        case 'summary':
          res = isBudget ? 
            await BudgetTkrService.toAddMonthBudget(Cli.args) : await ExpenseTkrService.toListExpenseWithFilter(Cli.args);
          break;
        case 'export':
          res = await FileProcTkrService.toCreateCsvFile(Cli.args);
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
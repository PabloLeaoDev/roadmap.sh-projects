#!/usr/bin/env node

import ExpenseTkrService from "./ExpenseTkrService";

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

  static async cliOptions(): Promise<void> {
      if (!['add', 'update', 'delete', 'list', 'summary'].includes(ExpenseTkrCli.args[0]))
        throw new Error('This option does not exists');

      switch (ExpenseTkrCli.args[0]) {
        case 'add':
          await ExpenseTkrService.toAddExpense(ExpenseTkrCli.args);
          break;
        case 'update':
          await ExpenseTkrService.toUpdateDescriptionExpense(ExpenseTkrCli.args);
          break;
        case 'delete':
          await ExpenseTkrService.toDeleteExpense(ExpenseTkrCli.args);
          break;
        case 'list':
          await ExpenseTkrService.toListAllExpenses();
          break;
        case 'summary':
          await ExpenseTkrService.toListExpenseByStatus(ExpenseTkrCli.args);
          break;
      }
  } 
}

new ExpenseTkrCli();
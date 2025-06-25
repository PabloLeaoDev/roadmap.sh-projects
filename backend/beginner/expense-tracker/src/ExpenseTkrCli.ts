#!/usr/bin/env node

import ExpenseTkrModel from "./ExpenseTkrModel";

export default class ExpenseTkrCli {
  private static args: string[];

  constructor() {
    const cleanArgs = process.argv.slice(2);

    console.log(cleanArgs);

    ExpenseTkrCli.args = cleanArgs;

    ExpenseTkrCli.cliOptions();
  }

  static getArgs(): string[] {
    return ExpenseTkrCli.args;
  }

  static setArgs(args: string[]): void {
    ExpenseTkrCli.args = args;
  }

  static async toAddExpense(description: string, amount: number): Promise<void> {
    await ExpenseTkrModel.addExpense({ description, amount });
  }

  static async toUpdateDescriptionExpense(id: number, description?: string, amount?: number ): Promise<void> {
    await ExpenseTkrModel.updateExpense(id, { description, amount });
  }

  static async toListAllExpenses(): Promise<void> {
    await ExpenseTkrModel.listExpenses();
  }

  static async toListExpenseByStatus(month: number): Promise<void> {
    await ExpenseTkrModel.listExpenses(month);
  }

  static async toDeleteExpense(id: number): Promise<void> {
    await ExpenseTkrModel.deleteExpense(id);
  }

  static async cliOptions(): Promise<void> {
    try {
      const id: number | undefined = Number((ExpenseTkrCli.args[1]));

      let description = '', amount = 0, month = 0;

      if (!['add', 'update', 'delete', 'list', 'summary'].includes(ExpenseTkrCli.args[0]))
        throw new Error('This option does not exists');

      switch (ExpenseTkrCli.args[0]) {
        case 'add':
          if (ExpenseTkrCli.args[1] !== '--description') throw new Error('Please use the "--description" option');

          description = ExpenseTkrCli.args[2];

          if (ExpenseTkrCli.args[3] !== '--amount') throw new Error('Please use the "--amount" option');

          amount = Number(ExpenseTkrCli.args[4]);

          if (!description) throw new Error('You have not set a description for this expense');
          if (!amount) throw new Error('You have not set an amount for this expense');
          else if (isNaN(amount)) throw new Error('The set amount is not a number');

          await ExpenseTkrCli.toAddExpense(description, amount);

          break;
        case 'update':
          if (!id) throw new Error('You have not set an ID to select the expense');

          description = ExpenseTkrCli.args[2];

          if (!description) throw new Error('You have not set a description to the selected expense');

          await ExpenseTkrCli.toUpdateDescriptionExpense(id, description);

          break;
        case 'delete':
          if (!id) throw new Error('You have not set an ID to delete a expense');

          await ExpenseTkrCli.toDeleteExpense(id);

          break;
        case 'list':
          await ExpenseTkrCli.toListAllExpenses();

          break;
        case 'summary':
          month = Number(ExpenseTkrCli.args[2]);

          if (!month) throw new Error('You have not set a month to the summary');
          else if (month < 1 || month > 12) throw new Error('The month must be between 1 and 12');

          await ExpenseTkrCli.toListExpenseByStatus(month);

          break;
      }
    } catch (err) {
      console.error(err);
    }
  }
}

new ExpenseTkrCli();
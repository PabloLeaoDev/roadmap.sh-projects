#!/usr/bin/env node

import ExpenseTkrModel from "./ExpenseTkrModel";

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

  static async cliOptions(): Promise<number> {
    try {
      const id: number | undefined = Number((ExpenseTkrCli.args[1]));

      let description = '', amount = 0, month = 0, argFlags: string[] = [];

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
          if (ExpenseTkrCli.args.length !== 4 && ExpenseTkrCli.args.length !== 6) throw new Error('Please use a valid number of args');

          if (!id) throw new Error('You have not set an ID to select the expense');
          
          argFlags.push(ExpenseTkrCli.args[2]);

          const isFlagsInvalid = (flags: string[], flagsLength: number): string => {
            if (flags.length !== flagsLength) return 'Please use a valid number of flags';

            for (let flag of flags) {
              if (flag === '--description' || flag === '--amount') continue;
              else return 'Please use the "--description" or "--amount" option';
            }

            if (flags.length > 1 && flags[0] === flags[1]) return 'The both flags are the same';

            return '';
          };

          let flagError: string;

          flagError = isFlagsInvalid(argFlags, 1);

          if (flagError) throw new Error(flagError);

          if ((ExpenseTkrCli.args.length === 4)) {
            if (argFlags[0] === '--amount') {
              amount = Number(ExpenseTkrCli.args[3]);

              if (!amount) throw new Error('You have set an invalid amount to the selected expense');
            } else if (argFlags[0] === '--description') description = ExpenseTkrCli.args[3];
          } else {
            argFlags.push(ExpenseTkrCli.args[4]);

            flagError = isFlagsInvalid(argFlags, 2);

            if (flagError) throw new Error(flagError);

            if (argFlags[0] === '--description') {
              amount = Number(ExpenseTkrCli.args[5]);
              description = ExpenseTkrCli.args[3];
            } else if (argFlags[0] === '--amount') {
              amount = Number(ExpenseTkrCli.args[3]);

              if (!amount) throw new Error('You have set an invalid amount to the selected expense');

              description = ExpenseTkrCli.args[5];
            }
          }

          if (!description && !amount) throw new Error('You have not set a description or an amount to the selected expense');

          await ExpenseTkrCli.toUpdateDescriptionExpense(id, description, amount);

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

      return 0;
    } catch (err) {
      console.error(err);
      return 1;
    }
  } 
}

// new ExpenseTkrCli();
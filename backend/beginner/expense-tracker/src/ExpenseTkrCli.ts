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

  static async toAddExpense(description: string, category: string, amount: number): Promise<void> {
    await ExpenseTkrModel.addExpense({ description, category, amount });
  }

  static async toUpdateDescriptionExpense(id: number, description?: string, category?: string, amount?: number ): Promise<void> {
    await ExpenseTkrModel.updateExpense(id, { description, category, amount });
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

      let description = '', category = '', amount = 0, month = 0, argFlags: string[] = [];

      if (!['add', 'update', 'delete', 'list', 'summary'].includes(ExpenseTkrCli.args[0]))
        throw new Error('This option does not exists');

      switch (ExpenseTkrCli.args[0]) {
        case 'add':
          if (ExpenseTkrCli.args[1] !== '--description') throw new Error('Please use the "--description" option');

          description = ExpenseTkrCli.args[2];

          if (ExpenseTkrCli.args[3] !== '--category') throw new Error('Please use the "--category" option');

          category = ExpenseTkrCli.args[4];

          if (ExpenseTkrCli.args[5] !== '--amount') throw new Error('Please use the "--amount" option');

          amount = Number(ExpenseTkrCli.args[6]);

          if (!description) throw new Error('You have not set a description for this expense');
          if (!amount) throw new Error('You have not set an amount for this expense');
          else if (isNaN(amount)) throw new Error('The set amount is not a number');

          await ExpenseTkrCli.toAddExpense(description, category, amount);

          break;
        case 'update':
          if (ExpenseTkrCli.args.length !== 4 && ExpenseTkrCli.args.length !== 6 && ExpenseTkrCli.args.length !== 8) throw new Error('Please use a valid number of args');

          if (!id) throw new Error('You have not set an ID to select the expense');
          
          argFlags.push(ExpenseTkrCli.args[2]);

          const isFlagsInvalid = (flags: string[], flagsLength: number): string => {
            if (flags.length !== flagsLength) return 'Please use a valid number of flags';

            for (let flag of flags) {
              if (flag === '--description' || flag === '--category' || flag === '--amount') continue;
              else return 'Please use the "--description", "--category" or "--amount" option';
            }

            if (flags.length > 1 && (
              flags[0] === flags[1] ||
              flags[1] === flags[2] ||
              flags[0] === flags[2]
            )) return 'There is repetition of flags';

            return '';
          };

          let flagError: string;

          flagError = isFlagsInvalid(argFlags, 1);

          if (flagError) throw new Error(flagError);

          if ((ExpenseTkrCli.args.length === 4)) {
            if (argFlags[0] === '--amount') {
              
              amount = Number(ExpenseTkrCli.args[3]);

              if (!amount) throw new Error('You have set an invalid amount to the selected expense');

            } else if (argFlags[0] === '--description') {
              description = ExpenseTkrCli.args[3];
            } else if (argFlags[0] === '--category') {
              category = ExpenseTkrCli.args[3];
            }
          } else if (ExpenseTkrCli.args.length === 6) {
            argFlags.push(ExpenseTkrCli.args[4]);

            flagError = isFlagsInvalid(argFlags, 2);

            if (flagError) throw new Error(flagError);

            if (argFlags[0] === '--description') {
              description = ExpenseTkrCli.args[3];
              
              if (argFlags[1] === '--category') 
                category = ExpenseTkrCli.args[5];
              else {
                amount = Number(ExpenseTkrCli.args[5]);

                if (!amount) throw new Error('You have set an invalid amount to the selected expense');
              }
            } else if (argFlags[0] === '--category') {
               category = ExpenseTkrCli.args[3];

              if (argFlags[1] === '--amount') {
                amount = Number(ExpenseTkrCli.args[3]);

                if (!amount) throw new Error('You have set an invalid amount to the selected expense');
              } else description = ExpenseTkrCli.args[5];
            } else {
              amount = Number(ExpenseTkrCli.args[3]);

              if (!amount) throw new Error('You have set an invalid amount to the selected expense');

              if (argFlags[1] === '--category') 
                category = ExpenseTkrCli.args[5];
              else
                description = ExpenseTkrCli.args[5];
            }
          } else { // is length 8
            argFlags.push(ExpenseTkrCli.args[6]);

            flagError = isFlagsInvalid(argFlags, 3);

            if (flagError) throw new Error(flagError);

            if (argFlags[0] === '--description') {
              description = ExpenseTkrCli.args[3];
              
              if (argFlags[1] === '--category') {
                category = ExpenseTkrCli.args[5];
                amount = Number(ExpenseTkrCli.args[7]);
              } else {
                amount = Number(ExpenseTkrCli.args[5]);
                category = ExpenseTkrCli.args[7];
              }

              if (!amount) throw new Error('You have set an invalid amount to the selected expense');
            } else if (argFlags[0] === '--category') {
              category = ExpenseTkrCli.args[3];

              if (argFlags[1] === '--amount') {
                amount = Number(ExpenseTkrCli.args[3]);
                description = ExpenseTkrCli.args[7];
              } else {
                description = ExpenseTkrCli.args[5];
                amount = Number(ExpenseTkrCli.args[7]);
              }

              if (!amount) throw new Error('You have set an invalid amount to the selected expense');
            } else {
              amount = Number(ExpenseTkrCli.args[3]);

              if (!amount) throw new Error('You have set an invalid amount to the selected expense');

              if (argFlags[1] === '--category') {
                category = ExpenseTkrCli.args[5];
                description = ExpenseTkrCli.args[7];
              }
              else {
                description = ExpenseTkrCli.args[5];
                category = ExpenseTkrCli.args[7];
              }
            }
          }

          if (!description && !category && !amount) throw new Error('You have not set a description, a category or an amount to the selected expense');

          await ExpenseTkrCli.toUpdateDescriptionExpense(id, description, category, amount);

          break;
        case 'delete':
          if (!id) throw new Error('You have not set an ID to delete a expense');

          await ExpenseTkrCli.toDeleteExpense(id);

          break;
        case 'list':
          await ExpenseTkrCli.toListAllExpenses();

          break;
        case 'summary':
          const summaryFlags = ['--month', '--category'];

          if (!summaryFlags.includes(ExpenseTkrCli.args[1]) || !summaryFlags.includes(ExpenseTkrCli.args[3])) throw new Error('This option does not exists');
          if (ExpenseTkrCli.args[3] && (ExpenseTkrCli.args[1] === ExpenseTkrCli.args[3])) throw new Error('You cannot use the same option twice');

          month = Number(ExpenseTkrCli.args[2]);

          if (!month) throw new Error('You have not set a month to the summary');

          category = ExpenseTkrCli.args[4];

          if (!category) throw new Error('You have not set a category to the summary');

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

new ExpenseTkrCli();
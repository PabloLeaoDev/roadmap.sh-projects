import ExpenseTkrModel from "./ExpenseTkrModel";
import { ResponseCLI } from "./interfaces/expense.interface";

export default class ExpenseTkrService {
  static async toAddExpense(args: string[]): Promise<ResponseCLI> {
    try {
      if (args[1] !== '--description') throw new Error('Please use the "--description" option');
      if (args[3] !== '--category') throw new Error('Please use the "--category" option');
      if (args[5] !== '--amount') throw new Error('Please use the "--amount" option');
  
      const description = args[2];
      const category = args[4];
      const amount = Number(args[6]);
  
      if (!description) throw new Error('You have not set a description for this expense');
      if (!amount) throw new Error('You have not set an amount for this expense');
      else if (isNaN(amount)) throw new Error('The set amount is not a number');
    
      const { id, expense } = await ExpenseTkrModel.addExpense({ description, category, amount });

      return { success: false, message: `Expense added successfully (ID: ${id})`, expense };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  static async toUpdateDescriptionExpense(args: string[] ): Promise<ResponseCLI> {
    try {
      const id: number | undefined = Number((args[1]));
      const argFlags: string[] = [];
      let [ description, category, amount ] = ['', '', 0];

      if (args.length !== 4 && args.length !== 6 && args.length !== 8) throw new Error('Please use a valid number of args');

      if (!id) throw new Error('You have not set an ID to select the expense');
      
      argFlags.push(args[2]);

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

      if ((args.length === 4)) {
        if (argFlags[0] === '--amount') {
          
          amount = Number(args[3]);

          if (!amount) throw new Error('You have set an invalid amount to the selected expense');

        } else if (argFlags[0] === '--description') {
          description = args[3];
        } else if (argFlags[0] === '--category') {
          category = args[3];
        }
      } else if (args.length === 6) {
        argFlags.push(args[4]);

        flagError = isFlagsInvalid(argFlags, 2);

        if (flagError) throw new Error(flagError);

        if (argFlags[0] === '--description') {
          description = args[3];
          
          if (argFlags[1] === '--category') 
            category = args[5];
          else {
            amount = Number(args[5]);

            if (!amount) throw new Error('You have set an invalid amount to the selected expense');
          }
        } else if (argFlags[0] === '--category') {
            category = args[3];

          if (argFlags[1] === '--amount') {
            amount = Number(args[3]);

            if (!amount) throw new Error('You have set an invalid amount to the selected expense');
          } else description = args[5];
        } else {
          amount = Number(args[3]);

          if (!amount) throw new Error('You have set an invalid amount to the selected expense');

          if (argFlags[1] === '--category') 
            category = args[5];
          else
            description = args[5];
        }
      } else { // is length 8
        argFlags.push(args[6]);

        flagError = isFlagsInvalid(argFlags, 3);

        if (flagError) throw new Error(flagError);

        if (argFlags[0] === '--description') {
          description = args[3];
          
          if (argFlags[1] === '--category') {
            category = args[5];
            amount = Number(args[7]);
          } else {
            amount = Number(args[5]);
            category = args[7];
          }

          if (!amount) throw new Error('You have set an invalid amount to the selected expense');
        } else if (argFlags[0] === '--category') {
          category = args[3];

          if (argFlags[1] === '--amount') {
            amount = Number(args[3]);
            description = args[7];
          } else {
            description = args[5];
            amount = Number(args[7]);
          }

          if (!amount) throw new Error('You have set an invalid amount to the selected expense');
        } else {
          amount = Number(args[3]);

          if (!amount) throw new Error('You have set an invalid amount to the selected expense');

          if (argFlags[1] === '--category') {
            category = args[5];
            description = args[7];
          } else {
            description = args[5];
            category = args[7];
          }
        }
      }

      if (!description && !category && !amount) throw new Error('You have not set a description, a category or an amount to the selected expense');

      const { expense } = await ExpenseTkrModel.updateExpense(id, { description, category, amount });

      return { success: true, message: `Expense updated successfully (ID: ${id})`, expense };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  static async toListAllExpenses(): Promise<ResponseCLI | void> {
    try {
      await ExpenseTkrModel.listExpenses();
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  static async toListExpenseWithFilter(args: string[]): Promise<ResponseCLI | void> {
    try {
      const summaryFlags = ['--month', '--category'];
  
      if (!summaryFlags.includes(args[1]) || !summaryFlags.includes(args[3])) throw new Error('This option does not exists');
      if (args[3] && (args[1] === args[3])) throw new Error('You cannot use the same option twice');
  
      const month = Number(args[2]);
  
      if (!month) throw new Error('You have not set a month to the summary');
  
      const category = args[4];
  
      if (!category) throw new Error('You have not set a category to the summary');
  
      else if (month < 1 || month > 12) throw new Error('The month must be between 1 and 12');
  
      await ExpenseTkrModel.listExpenses(month);
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  static async toDeleteExpense(args: string[]): Promise<ResponseCLI | void> {
    try {
      const id: number | undefined = Number((args[1]));

      if (args.length !== 2) throw new Error('You must set 2 arguments to delete option');
      if (!id) throw new Error('You have not set an ID to delete a expense');

      await ExpenseTkrModel.deleteExpense(id);
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  } 
}
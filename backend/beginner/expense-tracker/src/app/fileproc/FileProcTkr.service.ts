import { ResponseCli } from "../../interfaces/generic.interface";
import * as FileProcTkrModel from "./FileProcTkr.model";

export async function toCreateCsvFile(args: string[]): Promise<ResponseCli | void> {
  try {
    if (args.length !== 2) throw new Error('Please use a valid number of args');
    if (args[1] !== 'expenses') throw new Error('Please use the "expenses" option');

    await FileProcTkrModel.createCsvFile();
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}
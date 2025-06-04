#!/usr/bin/env node

import { Task, UpdatableTaskFields} from './interfaces/task';
import { promises as fs, existsSync } from 'fs';
import { resolve } from 'path';

export default class TaskCLI {
  public static args: Array<string> = process.argv;
  public static dataPath: string = resolve('db', 'data.json');
  // private static id: number = 0;

  static async listTasks(): Promise<void> {
    try {
      const data = await fs.readFile(TaskCLI.dataPath, 'utf-8'),
            convertData = data ? JSON.parse(data) : null;

      if (!convertData) {
        console.log('No tasks in database!');
        return;
      }

      for (let task of convertData) console.log(task);
    } catch (err) {
      console.error(err);
    }
  }

  static async createPath(path: string): Promise<void> {
    try {
       const cleanPath = path.split('\\');

      if (cleanPath[cleanPath.length - 1].includes('.')) cleanPath.pop();

      await fs.mkdir(cleanPath.join('\\'), { recursive: true });

      console.log('The path has been created!');
    } catch (err) {
      console.error(err);
    }
  }

  static async createDataBase(fileContent = '[]'): Promise<void> {
    try {
      await fs.writeFile(TaskCLI.dataPath, fileContent);
    } catch (err) {
      console.log('Creating database...');
      await TaskCLI.createPath(TaskCLI.dataPath);
      await TaskCLI.createDataBase();
    } finally {
      console.log('The file has been saved!')
    }
  }

  static changeTaskStatus() {

  }

  static async addTask(task?: Task): Promise<void> {
    if (!existsSync(TaskCLI.dataPath)) await TaskCLI.createDataBase();

    // codificar uma forma de nunca repetir os IDs

    try {
      const data = await fs.readFile(TaskCLI.dataPath, 'utf-8'),
            convertData = data ? JSON.parse(data) : [], 
            concatData = [...convertData, task], 
            reconvertData = JSON.stringify(concatData);

      if (reconvertData) TaskCLI.createDataBase(reconvertData);

      console.log('Task added!');
    } catch (err) {
      console.error(err);
    }
  }

  static async updateTask(id: number, fields: { description?: string, status?: boolean }) {
    if (!existsSync(TaskCLI.dataPath)) return;

    try {
      const data = await fs.readFile(TaskCLI.dataPath, 'utf-8'),
            convertData = data ? JSON.parse(data) : null;

      if (!convertData) {
        console.log('No data to be updated!');
        return;
      }

      let isTaskExists = false;
      for (let task of convertData) {
        if (task.id === id) isTaskExists = true;
      }

      if (!isTaskExists) throw new Error('This task do not exists in database!');

      const newConvertData = (convertData as Task[]).map((task) => {
        if (task && task.id === id) {
          for (let field in fields) {
            const key = field as UpdatableTaskFields,
                  value = fields[key];

            if (key === 'description' && typeof value === 'string') task.description = value;
            else if (key === 'status' && typeof value === 'boolean') task.status = value;
          }
        }

        return task;
      });

      const reconvertData = JSON.stringify([...newConvertData]);

      await TaskCLI.createDataBase(reconvertData);
    } catch (err) {
      console.error(err);
    }
  }

  static async deleteTask(id: number): Promise<void> {
    if (!existsSync(TaskCLI.dataPath)) return;

    try {
      const data = await fs.readFile(TaskCLI.dataPath, 'utf-8'),
            convertData = data ? JSON.parse(data) : null;

      if (!convertData) {
        console.log('No data to be deleted!');
        return;
      }

      (convertData as Task[]).map((task, i) => {
        if (task && task.id === id) {
          console.log(convertData.splice(i, 1));
          
          return null;
        }
        return task;
      });

      const reconvertData = JSON.stringify([...convertData]);

      if (reconvertData) TaskCLI.createDataBase(reconvertData);
    } catch (err) {
      console.error(err);
    }
  }
}

// (async () => {
//   for (let i = 1; i < 30; i++) {
//     await TaskCLI.addTask({
//       id: i,
//       description: 'string',
//       status: true,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     })
//   }
// })();

// TaskCLI.deleteTask(24);
// TaskCLI.updateTask(20, { description: 'teste' })
// TaskCLI.listTasks();
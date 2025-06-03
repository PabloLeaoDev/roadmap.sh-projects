#!/usr/bin/env node

import { Task, TaskFields} from './interfaces/task';
import { promises as fs, existsSync } from 'fs';
import { resolve } from 'path';

export default class TaskCLI {
  public static args: Array<string> = process.argv;
  public static dataPath: string = resolve('db', 'data.json');

  static async listTasks(): Promise<void> {

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

  static async updateTask(id: number, fields: Record<TaskFields, string | boolean>) {
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
          for (let field in fields) {
            //task[field] = 
          }
          
          return null;
        }
        return task;
      });

      const reconvertData = JSON.stringify([...convertData]);
    } catch (err) {

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
//   for (let i = 0; i < 30; i++) {
//     await TaskCLI.addTask({
//       id: i,
//       description: 'string',
//       status: true,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     })
//   }
// })();

TaskCLI.deleteTask(6);
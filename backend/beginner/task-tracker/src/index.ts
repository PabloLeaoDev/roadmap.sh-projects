#!/usr/bin/env node

import task from './interfaces/task';
import { writeFile, readFile, mkdir } from 'fs';
import { resolve } from 'path';

export default class TaskCLI {
  public static args: Array<string> = process.argv;
  public static dataPath: string = resolve('db', 'data.json');

  static createPath(path: string) {
    const cleanPath = path.split('\\');

    if (cleanPath[cleanPath.length - 1].includes('.')) cleanPath.pop();

    mkdir(cleanPath.join('\\'), { recursive: true }, (err) => {
      if (err) new Error(err.message);

      console.log('The path has been created!');
    });
  }

  static createDataBase(): void {
    writeFile(TaskCLI.dataPath, '[]', (err) => {
      if (err) {
        TaskCLI.createPath(TaskCLI.dataPath);
        TaskCLI.createDataBase();
      } else console.log('The file has been saved!');
    });
  }

  static changeTaskStatus() {

  }

  static addTask() {

  }

  static updateTask() {

  }

  static deleteTask() {

  }
}

TaskCLI.createDataBase()
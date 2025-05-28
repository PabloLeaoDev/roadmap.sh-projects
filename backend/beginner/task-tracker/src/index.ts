#!/usr/bin/env node

import Task from './interfaces/task';
import { writeFile, readFile, mkdir, existsSync } from 'fs';
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

  static createDataBase(fileContent = '[]'): void {
    writeFile(TaskCLI.dataPath, fileContent, (err) => {
      if (err) {
        TaskCLI.createPath(TaskCLI.dataPath);
        TaskCLI.createDataBase();
      } else if (!existsSync(TaskCLI.dataPath)) console.log('The file has been saved!');
    });
  }

  static changeTaskStatus() {

  }

  static addTask(task?: Task) {
    if (!existsSync(TaskCLI.dataPath)) TaskCLI.createDataBase();

    readFile(TaskCLI.dataPath, 'utf-8', (err, data) => {
      if (err) new Error(err.message);

      let convertData = [], concatData, reconvertData;

      if (data) convertData = JSON.parse(data);

      concatData = [...convertData, task];
      reconvertData = JSON.stringify(concatData);

      if (reconvertData) TaskCLI.createDataBase(reconvertData);
      else throw new Error('Cannot add the task!');
    })
  }

  static updateTask() {

  }

  static deleteTask() {

  }
}

TaskCLI.addTask({
  id: 1,
  description: 'string',
  status: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
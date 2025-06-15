#!/usr/bin/env node

import TaskModel from "./TaskModel";

export default class TaskCli {
  private static args: string[];

  constructor() {
    const cleanArgs = process.argv;

    for (let i = 0; i < 2; i++) 
      cleanArgs.shift();
    
    TaskCli.args = cleanArgs;

    this.cliOptions();
  }

  async toAddTask(description: string): Promise<void> {
    await TaskModel.addTask({ description });
  }

  async toUpdateDescriptionTask(id: number, description: string): Promise<void> {
    await TaskModel.updateTask(id, { description });
  }

  async toListAllTasks(): Promise<void> {
    await TaskModel.listTasks();
  }

  async toListTaskByStatus(status: 'done' | 'todo' | 'inProgress'): Promise<void> {
    await TaskModel.listTasks(status);
  }

  async toDeleteTask(id: number): Promise<void> {
    await TaskModel.deleteTask(id);
  }

  async toUpdateStatusTask(id: number, statusKey: 'done' | 'inProgress'): Promise<void> {
      const statusObj = { done: false, todo: false, inProgress: false };

      statusObj[statusKey] = true;

      await TaskModel.updateTask(id, { status: statusObj });
  }

  async cliOptions(): Promise<void> {
    try {
      const id: number | undefined = Number((TaskCli.args[1]));

      let description = '', status = '';

      if (!['add', 'update', 'delete', 'list', 'mark-in-progress', 'mark-done'].includes(TaskCli.args[0]))
        throw new Error('This option does not exists');

      switch (TaskCli.args[0]) {
        case 'add':
          description = TaskCli.args[1];

          if (!description) throw new Error('You have not set a description for this task');

          await this.toAddTask(description);

          break;
        case 'update':
          if (!id) throw new Error('You have not set an ID to select the task');

          description = TaskCli.args[2];

          if (!description) throw new Error('You have not set a description to the selected task');

          await this.toUpdateDescriptionTask(id, description);

          break;
        case 'delete':
          if (!id) throw new Error('You have not set an ID to delete a task');

          await this.toDeleteTask(id);

          break;
        case 'list':
          status = TaskCli.args[1];

          if (status) {
            if (status === 'in-progress') 
              await this.toListTaskByStatus('inProgress');
            else if (status === 'done')
              await this.toListTaskByStatus('done');
            else if (status === 'todo')
              await this.toListTaskByStatus('todo');
            else throw new Error('This option does not exists!');
          } else await this.toListAllTasks();

          break;
        default:
          status = TaskCli.args[0];

          if (status) {
            if (status === 'mark-in-progress')
              await this.toUpdateStatusTask(id, 'inProgress');
            else if (status === 'mark-done')
              await this.toUpdateStatusTask(id, 'done');
          }

          break;
      }
    } catch (err) {
      console.error(err);
    }
  }
}

new TaskCli();
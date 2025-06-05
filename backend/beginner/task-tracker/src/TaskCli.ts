import TaskModel from "./TaskModel";
import { TaskStatusCli } from './interfaces/task';

export default class TaskCli {
  private static args: string[];

  constructor() {
    const cleanArgs = process.argv;

    for (let i = 0; i < 2; i++) 
      cleanArgs.shift();
    
    TaskCli.args = cleanArgs;
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


    const id: number | undefined = Number((TaskCli.args[1]));

    let description = '', status = '';

    if (!['add', 'update', 'delete', 'list', 'mark-in-progress', 'mark-done'].includes(TaskCli.args[0]))
      throw new Error('This option does not exists');

    switch (TaskCli.args[0]) {
      case 'add':
        description = TaskCli.args[1];

        if (!description) // throw error

        await this.toAddTask(description);

        break;
      case 'update':
        if (!id) // throw error

        description = TaskCli.args[2];

        if (!description) // throw error

        await this.toUpdateDescriptionTask(id, description);

        break;
      case 'delete':
        if (!id) // throw error

        await this.toDeleteTask(id);

        break;
      case 'list':
        status = TaskCli.args[1];

        if (status) {
          if (status === 'in-progress') 
            await this.toListTaskByStatus('inProgress');
          else
            await this.toListTaskByStatus(status as ("done" | "todo"));
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
  }
}

new TaskCli();
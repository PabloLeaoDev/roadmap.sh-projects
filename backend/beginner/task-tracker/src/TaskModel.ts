import { Task, UpdatableTaskFields} from './interfaces/task';
import { promises as fs, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

export default class TaskModel {
  private static __filename = fileURLToPath(import.meta.url);
  private static __dirname = dirname(TaskModel.__filename); 
  public static dataPath: string = resolve(TaskModel.__dirname, 'db', 'data.json');

  private static getCurrentDateFormat(): string {
      const formatDate = new Date().toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          });

      const formatHour = new Date().toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                          });

      return `${formatDate} ${formatHour}`;
  }

  static async listTasks(status?: 'done' | 'todo' | 'inProgress'): Promise<void> {
    try {
      const data = await fs.readFile(TaskModel.dataPath, 'utf-8'),
            convertData = data ? JSON.parse(data) : null;

      if (!convertData) {
        console.log('No tasks in database!');
        return;
      }

      if (!status) {
        for (let task of convertData) {
          console.log(`ID: ${task.id}\nDescription: ${task.description}\nStatus: ${task.status['todo'] ? 'To Do' : task.status['inProgress'] ? 'In Progress' : 'Done'}\nCreated At: ${task.createdAt}\nUpdated At: ${task.updatedAt}`);
          console.log(`----------------------------------`);
        }
      } else {
        for (let task of convertData) {
          if (task.status[status]) {
            console.log(`ID: ${task.id}\nDescription: ${task.description}\nStatus: ${status}\nCreated At: ${task.createdAt}\nUpdated At: ${task.updatedAt}`);
          console.log(`----------------------------------`);
          }
        }
      }
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
      await fs.writeFile(TaskModel.dataPath, fileContent);
    } catch (err) {
      console.log('Creating database...');

      await TaskModel.createPath(TaskModel.dataPath);
      await TaskModel.createDataBase();
    } finally {
      console.log('The file has been saved!')
    }
  }

  static async addTask(task: Task): Promise<void> {
    if (!existsSync(TaskModel.dataPath)) await TaskModel.createDataBase();

    try {
      const data = await fs.readFile(TaskModel.dataPath, 'utf-8'),
            convertData = data ? JSON.parse(data) : [];

      let id = 1,
          status = {
            done: false,
            todo: true,
            inProgress: false
          };

      if (convertData.length > 0) 
        id = convertData[convertData.length - 1].id + 1;

      task = { id, status, ...task, createdAt: this.getCurrentDateFormat(), updatedAt: this.getCurrentDateFormat() };
      
      const concatData = [...convertData, task], 
            reconvertData = JSON.stringify(concatData);

      if (reconvertData) TaskModel.createDataBase(reconvertData);

      console.log(`Task added successfully (ID: ${id})`);
    } catch (err) {
      console.error(err);
    }
  }

  static async updateTask(id: number, fields: { description?: string, status?: { done: boolean, todo: boolean, inProgress: boolean } }) {
    if (!existsSync(TaskModel.dataPath)) return;

    try {
      const data = await fs.readFile(TaskModel.dataPath, 'utf-8'),
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
            else if (key === 'status' && typeof value === 'object') task.status = value;

            task.updatedAt = this.getCurrentDateFormat();
          }
        }

        return task;
      });

      const reconvertData = JSON.stringify([...newConvertData]);

      await TaskModel.createDataBase(reconvertData);
    } catch (err) {
      console.error(err);
    }
  }

  static async deleteTask(id: number): Promise<void> {
    if (!existsSync(TaskModel.dataPath)) return;

    try {
      const data = await fs.readFile(TaskModel.dataPath, 'utf-8'),
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

      if (reconvertData) TaskModel.createDataBase(reconvertData);
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
// TaskCLI.updateTask(33, { description: 'Testando Update' })
// TaskCLI.listTasks('inProgress');

// TaskCLI.addTask({
//       description: 'teste'
//     })
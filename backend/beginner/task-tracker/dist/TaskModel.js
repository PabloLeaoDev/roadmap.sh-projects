var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { promises as fs, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
class TaskModel {
    static getCurrentDateFormat() {
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
    static listTasks(status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs.readFile(TaskModel.dataPath, 'utf-8'), convertData = data ? JSON.parse(data) : null;
                if (!convertData) {
                    console.log('No tasks in database!');
                    return;
                }
                if (!status) {
                    for (let task of convertData) {
                        console.log(`ID: ${task.id}\nDescription: ${task.description}\nStatus: ${task.status['todo'] ? 'To Do' : task.status['inProgress'] ? 'In Progress' : 'Done'}\nCreated At: ${task.createdAt}\nUpdated At: ${task.updatedAt}`);
                        console.log(`----------------------------------`);
                    }
                }
                else {
                    for (let task of convertData) {
                        if (task.status[status]) {
                            console.log(`ID: ${task.id}\nDescription: ${task.description}\nStatus: ${status}\nCreated At: ${task.createdAt}\nUpdated At: ${task.updatedAt}`);
                            console.log(`----------------------------------`);
                        }
                    }
                }
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    static createPath(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cleanPath = path.split('\\');
                if (cleanPath[cleanPath.length - 1].includes('.'))
                    cleanPath.pop();
                yield fs.mkdir(cleanPath.join('\\'), { recursive: true });
                console.log('The path has been created!');
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    static createDataBase() {
        return __awaiter(this, arguments, void 0, function* (fileContent = '[]') {
            try {
                yield fs.writeFile(TaskModel.dataPath, fileContent);
            }
            catch (err) {
                console.log('Creating database...');
                yield TaskModel.createPath(TaskModel.dataPath);
                yield TaskModel.createDataBase();
            }
            finally {
                console.log('The file has been saved!');
            }
        });
    }
    static addTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!existsSync(TaskModel.dataPath))
                yield TaskModel.createDataBase();
            try {
                const data = yield fs.readFile(TaskModel.dataPath, 'utf-8'), convertData = data ? JSON.parse(data) : [];
                let id = 1, status = {
                    done: false,
                    todo: true,
                    inProgress: false
                };
                if (convertData.length > 0)
                    id = convertData[convertData.length - 1].id + 1;
                task = Object.assign(Object.assign({ id, status }, task), { createdAt: this.getCurrentDateFormat(), updatedAt: this.getCurrentDateFormat() });
                const concatData = [...convertData, task], reconvertData = JSON.stringify(concatData);
                if (reconvertData)
                    TaskModel.createDataBase(reconvertData);
                console.log(`Task added successfully (ID: ${id})`);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    static updateTask(id, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!existsSync(TaskModel.dataPath))
                return;
            try {
                const data = yield fs.readFile(TaskModel.dataPath, 'utf-8'), convertData = data ? JSON.parse(data) : null;
                if (!convertData) {
                    console.log('No data to be updated!');
                    return;
                }
                let isTaskExists = false;
                for (let task of convertData) {
                    if (task.id === id)
                        isTaskExists = true;
                }
                if (!isTaskExists)
                    throw new Error('This task do not exists in database!');
                const newConvertData = convertData.map((task) => {
                    if (task && task.id === id) {
                        for (let field in fields) {
                            const key = field, value = fields[key];
                            if (key === 'description' && typeof value === 'string')
                                task.description = value;
                            else if (key === 'status' && typeof value === 'object')
                                task.status = value;
                            task.updatedAt = this.getCurrentDateFormat();
                        }
                    }
                    return task;
                });
                const reconvertData = JSON.stringify([...newConvertData]);
                yield TaskModel.createDataBase(reconvertData);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    static deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!existsSync(TaskModel.dataPath))
                return;
            try {
                const data = yield fs.readFile(TaskModel.dataPath, 'utf-8'), convertData = data ? JSON.parse(data) : null;
                if (!convertData) {
                    console.log('No data to be deleted!');
                    return;
                }
                convertData.map((task, i) => {
                    if (task && task.id === id) {
                        console.log(convertData.splice(i, 1));
                        return null;
                    }
                    return task;
                });
                const reconvertData = JSON.stringify([...convertData]);
                if (reconvertData)
                    TaskModel.createDataBase(reconvertData);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
TaskModel.__filename = fileURLToPath(import.meta.url);
TaskModel.__dirname = dirname(TaskModel.__filename);
TaskModel.dataPath = resolve(TaskModel.__dirname, 'db', 'data.json');
export default TaskModel;
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

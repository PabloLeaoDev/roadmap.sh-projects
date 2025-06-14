#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import TaskModel from "./TaskModel.js";
export default class TaskCli {
    constructor() {
        const cleanArgs = process.argv;
        for (let i = 0; i < 2; i++)
            cleanArgs.shift();
        TaskCli.args = cleanArgs;
        this.cliOptions();
    }
    toAddTask(description) {
        return __awaiter(this, void 0, void 0, function* () {
            yield TaskModel.addTask({ description });
        });
    }
    toUpdateDescriptionTask(id, description) {
        return __awaiter(this, void 0, void 0, function* () {
            yield TaskModel.updateTask(id, { description });
        });
    }
    toListAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            yield TaskModel.listTasks();
        });
    }
    toListTaskByStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield TaskModel.listTasks(status);
        });
    }
    toDeleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield TaskModel.deleteTask(id);
        });
    }
    toUpdateStatusTask(id, statusKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const statusObj = { done: false, todo: false, inProgress: false };
            statusObj[statusKey] = true;
            yield TaskModel.updateTask(id, { status: statusObj });
        });
    }
    cliOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number((TaskCli.args[1]));
                let description = '', status = '';
                if (!['add', 'update', 'delete', 'list', 'mark-in-progress', 'mark-done'].includes(TaskCli.args[0]))
                    throw new Error('This option does not exists');
                switch (TaskCli.args[0]) {
                    case 'add':
                        description = TaskCli.args[1];
                        if (!description)
                            throw new Error('You have not set a description for this task');
                        yield this.toAddTask(description);
                        break;
                    case 'update':
                        if (!id)
                            throw new Error('You have not set an ID to select the task');
                        description = TaskCli.args[2];
                        if (!description)
                            throw new Error('You have not set a description to the selected task');
                        yield this.toUpdateDescriptionTask(id, description);
                        break;
                    case 'delete':
                        if (!id)
                            throw new Error('You have not set an ID to delete a task');
                        yield this.toDeleteTask(id);
                        break;
                    case 'list':
                        status = TaskCli.args[1];
                        if (status) {
                            if (status === 'in-progress')
                                yield this.toListTaskByStatus('inProgress');
                            else
                                yield this.toListTaskByStatus(status);
                        }
                        else
                            yield this.toListAllTasks();
                        break;
                    default:
                        status = TaskCli.args[0];
                        if (status) {
                            if (status === 'mark-in-progress')
                                yield this.toUpdateStatusTask(id, 'inProgress');
                            else if (status === 'mark-done')
                                yield this.toUpdateStatusTask(id, 'done');
                        }
                        break;
                }
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
new TaskCli();

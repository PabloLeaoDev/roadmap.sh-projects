#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var TaskModel_1 = require("./TaskModel");
var TaskCli = /** @class */ (function () {
    function TaskCli() {
        var cleanArgs = process.argv;
        for (var i = 0; i < 2; i++)
            cleanArgs.shift();
        TaskCli.args = cleanArgs;
        this.cliOptions();
    }
    TaskCli.prototype.toAddTask = function (description) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, TaskModel_1.default.addTask({ description: description })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskCli.prototype.toUpdateDescriptionTask = function (id, description) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, TaskModel_1.default.updateTask(id, { description: description })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskCli.prototype.toListAllTasks = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, TaskModel_1.default.listTasks()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskCli.prototype.toListTaskByStatus = function (status) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, TaskModel_1.default.listTasks(status)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskCli.prototype.toDeleteTask = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, TaskModel_1.default.deleteTask(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskCli.prototype.toUpdateStatusTask = function (id, statusKey) {
        return __awaiter(this, void 0, void 0, function () {
            var statusObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        statusObj = { done: false, todo: false, inProgress: false };
                        statusObj[statusKey] = true;
                        return [4 /*yield*/, TaskModel_1.default.updateTask(id, { status: statusObj })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskCli.prototype.cliOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, description, status_1, _a, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 21, , 22]);
                        id = Number((TaskCli.args[1]));
                        description = '', status_1 = '';
                        if (!['add', 'update', 'delete', 'list', 'mark-in-progress', 'mark-done'].includes(TaskCli.args[0]))
                            throw new Error('This option does not exists');
                        _a = TaskCli.args[0];
                        switch (_a) {
                            case 'add': return [3 /*break*/, 1];
                            case 'update': return [3 /*break*/, 3];
                            case 'delete': return [3 /*break*/, 5];
                            case 'list': return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 15];
                    case 1:
                        description = TaskCli.args[1];
                        if (!description)
                            throw new Error('You have not set a description for this task');
                        return [4 /*yield*/, this.toAddTask(description)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 20];
                    case 3:
                        if (!id)
                            throw new Error('You have not set an ID to select the task');
                        description = TaskCli.args[2];
                        if (!description)
                            throw new Error('You have not set a description to the selected task');
                        return [4 /*yield*/, this.toUpdateDescriptionTask(id, description)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 20];
                    case 5:
                        if (!id)
                            throw new Error('You have not set an ID to delete a task');
                        return [4 /*yield*/, this.toDeleteTask(id)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 20];
                    case 7:
                        status_1 = TaskCli.args[1];
                        if (!status_1) return [3 /*break*/, 12];
                        if (!(status_1 === 'in-progress')) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.toListTaskByStatus('inProgress')];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 11];
                    case 9: return [4 /*yield*/, this.toListTaskByStatus(status_1)];
                    case 10:
                        _b.sent();
                        _b.label = 11;
                    case 11: return [3 /*break*/, 14];
                    case 12: return [4 /*yield*/, this.toListAllTasks()];
                    case 13:
                        _b.sent();
                        _b.label = 14;
                    case 14: return [3 /*break*/, 20];
                    case 15:
                        status_1 = TaskCli.args[0];
                        if (!status_1) return [3 /*break*/, 19];
                        if (!(status_1 === 'mark-in-progress')) return [3 /*break*/, 17];
                        return [4 /*yield*/, this.toUpdateStatusTask(id, 'inProgress')];
                    case 16:
                        _b.sent();
                        return [3 /*break*/, 19];
                    case 17:
                        if (!(status_1 === 'mark-done')) return [3 /*break*/, 19];
                        return [4 /*yield*/, this.toUpdateStatusTask(id, 'done')];
                    case 18:
                        _b.sent();
                        _b.label = 19;
                    case 19: return [3 /*break*/, 20];
                    case 20: return [3 /*break*/, 22];
                    case 21:
                        err_1 = _b.sent();
                        console.error(err_1);
                        return [3 /*break*/, 22];
                    case 22: return [2 /*return*/];
                }
            });
        });
    };
    return TaskCli;
}());
exports.default = TaskCli;
new TaskCli();

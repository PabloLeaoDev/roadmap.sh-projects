"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var TaskModel = /** @class */ (function () {
    function TaskModel() {
    }
    TaskModel.getCurrentDateFormat = function () {
        var formatDate = new Date().toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        var formatHour = new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        return "".concat(formatDate, " ").concat(formatHour);
    };
    TaskModel.listTasks = function (status) {
        return __awaiter(this, void 0, void 0, function () {
            var data, convertData, _i, convertData_1, task, _a, convertData_2, task, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs_1.promises.readFile(TaskModel.dataPath, 'utf-8')];
                    case 1:
                        data = _b.sent(), convertData = data ? JSON.parse(data) : null;
                        if (!convertData) {
                            console.log('No tasks in database!');
                            return [2 /*return*/];
                        }
                        if (!status) {
                            for (_i = 0, convertData_1 = convertData; _i < convertData_1.length; _i++) {
                                task = convertData_1[_i];
                                console.log("ID: ".concat(task.id, "\nDescription: ").concat(task.description, "\nStatus: ").concat(task.status['todo'] ? 'To Do' : task.status['inProgress'] ? 'In Progress' : 'Done', "\nCreated At: ").concat(task.createdAt, "\nUpdated At: ").concat(task.updatedAt));
                                console.log("----------------------------------");
                            }
                        }
                        else {
                            for (_a = 0, convertData_2 = convertData; _a < convertData_2.length; _a++) {
                                task = convertData_2[_a];
                                if (task.status[status]) {
                                    console.log("ID: ".concat(task.id, "\nDescription: ").concat(task.description, "\nStatus: ").concat(status, "\nCreated At: ").concat(task.createdAt, "\nUpdated At: ").concat(task.updatedAt));
                                    console.log("----------------------------------");
                                }
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _b.sent();
                        console.error(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TaskModel.createPath = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var cleanPath, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        cleanPath = path.split('\\');
                        if (cleanPath[cleanPath.length - 1].includes('.'))
                            cleanPath.pop();
                        return [4 /*yield*/, fs_1.promises.mkdir(cleanPath.join('\\'), { recursive: true })];
                    case 1:
                        _a.sent();
                        console.log('The path has been created!');
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.error(err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TaskModel.createDataBase = function () {
        return __awaiter(this, arguments, void 0, function (fileContent) {
            var err_3;
            if (fileContent === void 0) { fileContent = '[]'; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 5, 6]);
                        return [4 /*yield*/, fs_1.promises.writeFile(TaskModel.dataPath, fileContent)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        err_3 = _a.sent();
                        console.log('Creating database...');
                        return [4 /*yield*/, TaskModel.createPath(TaskModel.dataPath)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, TaskModel.createDataBase()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        console.log('The file has been saved!');
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TaskModel.addTask = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            var data, convertData, id, status_1, concatData, reconvertData, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!(0, fs_1.existsSync)(TaskModel.dataPath)) return [3 /*break*/, 2];
                        return [4 /*yield*/, TaskModel.createDataBase()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, fs_1.promises.readFile(TaskModel.dataPath, 'utf-8')];
                    case 3:
                        data = _a.sent(), convertData = data ? JSON.parse(data) : [];
                        id = 1, status_1 = {
                            done: false,
                            todo: true,
                            inProgress: false
                        };
                        if (convertData.length > 0)
                            id = convertData[convertData.length - 1].id + 1;
                        task = __assign(__assign({ id: id, status: status_1 }, task), { createdAt: this.getCurrentDateFormat(), updatedAt: this.getCurrentDateFormat() });
                        concatData = __spreadArray(__spreadArray([], convertData, true), [task], false), reconvertData = JSON.stringify(concatData);
                        if (reconvertData)
                            TaskModel.createDataBase(reconvertData);
                        console.log("Task added successfully (ID: ".concat(id, ")"));
                        return [3 /*break*/, 5];
                    case 4:
                        err_4 = _a.sent();
                        console.error(err_4);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TaskModel.updateTask = function (id, fields) {
        return __awaiter(this, void 0, void 0, function () {
            var data, convertData, isTaskExists, _i, convertData_3, task, newConvertData, reconvertData, err_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(0, fs_1.existsSync)(TaskModel.dataPath))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fs_1.promises.readFile(TaskModel.dataPath, 'utf-8')];
                    case 2:
                        data = _a.sent(), convertData = data ? JSON.parse(data) : null;
                        if (!convertData) {
                            console.log('No data to be updated!');
                            return [2 /*return*/];
                        }
                        isTaskExists = false;
                        for (_i = 0, convertData_3 = convertData; _i < convertData_3.length; _i++) {
                            task = convertData_3[_i];
                            if (task.id === id)
                                isTaskExists = true;
                        }
                        if (!isTaskExists)
                            throw new Error('This task do not exists in database!');
                        newConvertData = convertData.map(function (task) {
                            if (task && task.id === id) {
                                for (var field in fields) {
                                    var key = field, value = fields[key];
                                    if (key === 'description' && typeof value === 'string')
                                        task.description = value;
                                    else if (key === 'status' && typeof value === 'object')
                                        task.status = value;
                                    task.updatedAt = _this.getCurrentDateFormat();
                                }
                            }
                            return task;
                        });
                        reconvertData = JSON.stringify(__spreadArray([], newConvertData, true));
                        return [4 /*yield*/, TaskModel.createDataBase(reconvertData)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_5 = _a.sent();
                        console.error(err_5);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TaskModel.deleteTask = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data, convertData_4, reconvertData, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(0, fs_1.existsSync)(TaskModel.dataPath))
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fs_1.promises.readFile(TaskModel.dataPath, 'utf-8')];
                    case 2:
                        data = _a.sent(), convertData_4 = data ? JSON.parse(data) : null;
                        if (!convertData_4) {
                            console.log('No data to be deleted!');
                            return [2 /*return*/];
                        }
                        convertData_4.map(function (task, i) {
                            if (task && task.id === id) {
                                console.log(convertData_4.splice(i, 1));
                                return null;
                            }
                            return task;
                        });
                        reconvertData = JSON.stringify(__spreadArray([], convertData_4, true));
                        if (reconvertData)
                            TaskModel.createDataBase(reconvertData);
                        return [3 /*break*/, 4];
                    case 3:
                        err_6 = _a.sent();
                        console.error(err_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TaskModel.dataPath = (0, path_1.resolve)('db', 'data.json');
    return TaskModel;
}());
exports.default = TaskModel;
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

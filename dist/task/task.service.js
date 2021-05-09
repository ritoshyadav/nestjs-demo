"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const task_model_1 = require("./task.model");
const uuid_1 = require("uuid");
let TaskService = class TaskService {
    constructor() {
        this.tasks = [];
    }
    getAllTasks() {
        return this.tasks;
    }
    createTask(createTaskDto) {
        let { title, description } = createTaskDto;
        const task = {
            id: uuid_1.v1(),
            title,
            description,
            status: task_model_1.TaskStatus.OPEN
        };
        this.tasks.push(task);
        return task;
    }
    getTaskById(id) {
        return this.tasks.find(task => task.id == id);
    }
};
TaskService = __decorate([
    common_1.Injectable()
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map
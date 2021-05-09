import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
export declare class TaskService {
    private tasks;
    getAllTasks(): Task[];
    createTask(createTaskDto: CreateTaskDto): Task;
    getTaskById(id: string): Task;
}

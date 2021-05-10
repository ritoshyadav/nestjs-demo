import { Body, Controller, Get, Param, Post, Delete, Put, Patch, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Get()
    getTask(@Query() filterDto: GetTaskFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.taskService.getTaskWithFilter(filterDto)
        } else {
            return this.taskService.getAllTasks();
        }
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDto);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        return this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus,
    ): Task {
        return this.taskService.updateTaskStatus(id, status);
    }
}

import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  // Patch,
  ParseIntPipe,
  Res,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

import { Task } from './task.entity';
import * as express from 'express';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }
  @Get()
  getTasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }
  @Delete('/:id')
  public async deleteTask(
    @Param('id') id: number,
    @Res() response: express.Response,
  ): Promise<void> {
    try {
      await this.taskService.deleteTask(id, response);
    } catch (error) {
      // Handle other errors if needed
      response
        .status(error.status || 500)
        .json({ message: error.message || 'Internal Server Error' });
    }
  }
  @Put('/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: express.Response,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<void> {
    return this.taskService.updateTaskById(id, response, createTaskDto);
  }
}

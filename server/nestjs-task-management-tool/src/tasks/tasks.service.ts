import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repositary'; // Correct the typo here
// import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import * as express from 'express';
import { InjectRepository } from '@nestjs/typeorm';
// import { TaskStatus } from './taskModal';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTaskById(id: number): Promise<Task> {
    return this.taskRepository.getTaskById(id);
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }
  async deleteTask(id: number, response: express.Response): Promise<void> {
    await this.taskRepository.deleteTask(id, response);
  }
  async getTasks(): Promise<Task[]> {
    return this.taskRepository.getTasks();
  }
  async updateTaskById(
    id: number,
    response: express.Response,
    createTaskDto: CreateTaskDto,
  ): Promise<void> {
    await this.taskRepository.updateTaskById(id, response, createTaskDto);
  }
}

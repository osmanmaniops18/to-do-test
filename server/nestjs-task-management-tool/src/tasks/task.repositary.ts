// task.repository.ts
// import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import * as express from 'express';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const { title, description, status, imageUrl } = createTaskDto;
      const task = new Task();
      task.title = title;
      task.description = description;
      task.status = status;
      task.imageUrl = imageUrl;
      await task.save();
      return task;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async getTasks(): Promise<Task[]> {
    const tasks = await Task.find();
    return tasks;
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await Task.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async deleteTask(id: number, response: express.Response): Promise<void> {
    const result = await Task.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    response.status(200).json({ message: 'Task deleted successfully' });
  }
  async updateTaskById(
    id: number,
    response: express.Response,
    createTaskDto: CreateTaskDto,
  ): Promise<void> {
    const result = await this.getTaskById(id);

    if (!result) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    result.title = createTaskDto.title;
    result.description = createTaskDto.description;
    result.status = createTaskDto.status;
    result.imageUrl = createTaskDto.imageUrl;
    await result.save();
    response.status(200).json({ message: ' Task updated successfully' });
  }
}

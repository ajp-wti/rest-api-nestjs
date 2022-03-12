import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { AppService } from './app.service';
import {TasksModel} from "./tasks.model";

@Controller("tasks")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTasks() {
    return this.appService.getTasks()
  }

  @Post()
  addTasks(@Body() body) {
    return this.appService.addTasks(body)
  }

  @Delete()
  removeAllTasks() {
    return this.appService.removeAllTasks()
  }

  @Delete('/:id')
    removeTask(@Param('id') id:string) {
      return this.appService.removeTask(id)
    }

  @Put(':id')
    updateTask(@Param('id') id:string) {
      return this.appService.updateTask(id)
  }
}

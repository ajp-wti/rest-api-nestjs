import { Injectable } from '@nestjs/common';
import {TasksModel} from "./tasks.model";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  tasks: TasksModel[] = []

  getTasks(): TasksModel[] {
    return this.tasks
  }

  addTasks(task: TasksModel): TasksModel[] {
    this.tasks.push({
      id: uuidv4(),
      name: task.name,
      desc: task.desc,
      status: task.status
    })

    return this.tasks
  }

  removeAllTasks() {
    this.tasks.length = 0

    return "Pomyślnie usunięto wszystkie taski"
  }

  removeTask(id: string) {
    if(!this.tasks.some(task => task.id === id)) {
      return "Nie udało się usunąć taska"
    }
    const name = this.tasks.find(task => {
      return task.id === id ? task.name : null
    })
    this.tasks.filter(task => task.id !== id)

    return `Task ${name} został pomyśnie usunięty`
  }

  updateTask(id: string) {
    
  }
}

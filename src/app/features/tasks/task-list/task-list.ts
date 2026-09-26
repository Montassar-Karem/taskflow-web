import { Component, inject } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { TaskService } from '../task.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-task-list',
  imports: [TaskCard,RouterLink],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  private readonly taskService = inject(TaskService);

  tasks = this.taskService.tasks;
  taskCount = this.taskService.count;
  doneCount = this.taskService.doneCount;

  deleteTask(id: number) {
    this.taskService.delete(id);
  }

  toggleTask(id: number) {
    this.taskService.toggle(id);
  }

  addTask(){
    this.taskService.add;
  }
}
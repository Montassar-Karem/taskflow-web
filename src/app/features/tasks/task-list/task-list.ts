import { Component, inject } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  imports: [TaskCard],
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
}
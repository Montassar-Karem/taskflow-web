import { Component, computed, inject, input } from '@angular/core';
import { TaskService } from '../task.service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-task-detail',
  styleUrl: './task-detail.css',
  templateUrl: './task-detail.html',
})
export class TaskDetail {
  private readonly taskService = inject(TaskService);

  id = input.required<string>();

  task = computed(() => this.taskService.tasks().find(t => t.id === Number(this.id())));
}

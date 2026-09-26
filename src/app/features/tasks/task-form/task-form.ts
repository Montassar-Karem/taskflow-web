import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Priority } from '../task.model';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../task.service';


@Component({
  imports: [ReactiveFormsModule, RouterLink], //JsonPipe for debug in html
  selector: 'app-task-form',
  styleUrl: './task-form.css',
  templateUrl: './task-form.html',
})
export class TaskForm {
  private readonly fb = inject(FormBuilder);
  private readonly taskService = inject(TaskService);
  private readonly router = inject(Router);

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    priority: ['MEDIUM' as Priority, Validators.required],
    description: [''],
  });
  title = this.form.controls.title;

  save(){
    if (this.form.invalid) return;
    this.taskService.add(this.form.getRawValue());
    this.router.navigate(['/tasks']);
  }
}

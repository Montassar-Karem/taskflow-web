import { Component, input, computed, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-task-card',
  styleUrl: './task-card.css',
  templateUrl: './task-card.html',
})
export class TaskCard {
  title = input.required<string>();

  priority = input<'LOW' | 'MEDIUM' |'HIGH'>('MEDIUM');

  description = input<string>('');

  deleted = output<void>();

  done = input(false);

  toggled = output<void>();
  
  label = computed(() => (this.done() ? 'Done' : 'Mark as done'));

  id = input.required<number>();

  toggle() {
    this.toggled.emit();
  }

  remove(){
    this.deleted.emit();
  }

}

import { Injectable, signal, computed } from '@angular/core';
import { Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
    private readonly _tasks = signal<Task[]>([
        { id: 1, title: 'Set up Angular', priority: 'HIGH', done: false },
        { id: 2, title: 'Build the Spring API', priority: 'MEDIUM', done: false },
        { id: 3, title: 'Build CI/CD', priority: 'LOW', description: 'GitHub Actions pipeline', done: false },
    ]);

    readonly tasks = this._tasks.asReadonly();

    readonly count = computed(() => this._tasks().length);

    readonly doneCount = computed(() => this._tasks()
        .filter(t => t.done)
        .length);

    delete(id: number) {
        this._tasks.update(list => list.filter(t => t.id !== id));
    }

    toggle(id: number) {
        this._tasks.update(
            list => list.map(
                t => (t.id === id) ? {
                    ...t, done: !t.done
                } : t
            )
        )
    }

    add(task:Omit<Task, 'id' | 'done'>){
        const nextId = Math.max(0, ...this._tasks().map(t => t.id)) + 1;
        this._tasks.update(list => [...list, {...task,id: nextId,done:false}]);
    }
}
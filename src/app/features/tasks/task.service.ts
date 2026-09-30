import { Injectable, signal, computed, inject } from '@angular/core';
import { Task } from './task.model';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class TaskService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:8080/api/tasks';
    private readonly _tasks = signal<Task[]>([]);
    private readonly _loading = signal(false);
    private readonly _error = signal<string | null>(null);

    constructor() {
        this.load();
    }

    load() {
        this._loading.set(true);
        this._error.set(null);

        this.http.get<Task[]>(this.apiUrl)
            .subscribe(
                {
                    next: tasks => {
                        this._tasks.set(tasks);
                        this._loading.set(false);
                    },
                    error: () => {
                        this._error.set('Could not load tasks. Is the API running?');
                        this._loading.set(false);
                    },
                }
            );
    }

    readonly tasks = this._tasks.asReadonly();
    readonly count = computed(() => this._tasks().length);
    readonly doneCount = computed(() => this._tasks()
        .filter(t => t.done)
        .length);
    readonly loading = this._loading.asReadonly();
    readonly error = this._error.asReadonly();

    delete(id: number) {
        this.http.delete<void>(`${this.apiUrl}/${id}`)
            .subscribe(
                () => {
                    this._tasks.update(list => list.filter(t => t.id !== id))
                }
            );
    }

    toggle(id: number) {
        this.http.patch<Task>(`${this.apiUrl}/${id}/toggle`, null)
            .subscribe(
                updated => {
                    this._tasks.update(list => list.map(
                        t => t.id === updated.id ? updated : t
                    ));
                }
            );
    }

    add(task: Omit<Task, 'id' | 'done'>) {
        this.http.post<Task>(this.apiUrl, task)
            .subscribe(created => this._tasks.update(
                list => [...list, created]
            ));
    }
}
import { Routes } from '@angular/router';
import { TaskList } from './features/tasks/task-list/task-list';
import { TaskDetail } from './features/tasks/task-detail/task-detail';
import { NotFound } from './pages/not-found/not-found';
import { TaskForm } from './features/tasks/task-form/task-form';



export const routes: Routes = [
    {path: '', redirectTo:'tasks',pathMatch:'full' },
    {path:'tasks', component:TaskList},
    {path:'tasks/new', component:TaskForm},
    {path:'tasks/:id', component:TaskDetail},
    { path: '**', component: NotFound },
    
];

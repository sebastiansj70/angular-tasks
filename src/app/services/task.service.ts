import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { Person } from '../models/person.model';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private dataUrl = 'assets/data.json';

    constructor(private http: HttpClient) { }

    getTasks(): Observable<{ tasks: Task[] }> {
        return this.http.get<{ tasks: Task[] }>(this.dataUrl);
    }

    addTask(newTask: Task): Observable<void> {
        return new Observable(observer => {
            this.getTasks().subscribe(data => {
                const updatedTasks = [...data.tasks, newTask];
                observer.next();
                observer.complete();
            });
        });
    }

    addPersonToTask(taskId: number, newPerson: Person): Observable<void> {
        return new Observable(observer => {
            this.getTasks().subscribe(data => {
                const task = data.tasks.find(t => t.id === taskId);
                if (task) {
                    const personExists = task.assignees.some(assignee => assignee.fullName === newPerson.fullName);
                    if (!personExists) {
                        task.assignees.push(newPerson);
                        observer.next();
                    } else {
                        console.error('La persona ya está asignada a esta tarea.');
                    }
                }
                observer.complete();
            });
        });
    }


    removePersonFromTask(taskId: number, personId: number): Observable<void> {
        return new Observable(observer => {
            this.getTasks().subscribe(data => {
                const task = data.tasks.find(t => t.id === taskId);
                if (task) {
                    task.assignees = task.assignees.filter(person => person.id !== personId); observer.next();
                } else {
                    console.error('Tarea no encontrada.');
                }
                observer.complete();
            });
        });
    }

    toggleTaskCompletion(taskId: number): Observable<void> {
        return new Observable(observer => {
            this.getTasks().subscribe(data => {
                const task = data.tasks.find(t => t.id === taskId);
                if (task) {
                    task.completed = !task.completed;
                    observer.next();
                } else {
                    console.error('Tarea no encontrada.');
                }
                observer.complete();
            });
        });
    }
}

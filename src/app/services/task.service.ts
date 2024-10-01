import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task.model';
import { Person } from '../models/person.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    data: { tasks: Task[] } | undefined;
    private dataUrl = 'assets/data.json';
    private apiUrl = 'http://localhost:3000/tasks';

    constructor(private http: HttpClient) { }


    ngOnInit(): void {
        this.loadTasks();
    }

    loadTasks(): void {
        this.http.get<{ tasks: Task[] }>(this.dataUrl).subscribe(
            (response) => {
                this.data = response;
            },
            (error) => {
                console.error('Error al cargar la data:', error);
            }
        );
    }

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.apiUrl);
    }

    saveTasks(): Observable<void> {
        const blob = new Blob([JSON.stringify(this.data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        return this.http.put<void>(this.dataUrl, this.data);
    }

    addTask(newTask: Task): Observable<Task> {
        return this.http.post<Task>(this.apiUrl, newTask);
    }

    updateTask(task: Task): Observable<Task> {
        return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
    }

    removeTask(taskId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
    }

    addPersonToTask(taskId: number, newPerson: Person): Observable<Task> {
        return this.http.get<Task>(`${this.apiUrl}/${taskId}`).pipe(
            switchMap(task => {
                if (!task.assignees.some(assignee => assignee.fullName === newPerson.fullName)) {
                    task.assignees.push(newPerson);
                    return this.updateTask(task);
                } else {
                    throw new Error('La persona ya está asignada a esta tarea.');
                }
            })
        );
    }

    removePersonFromTask(taskId: number, personId: number): Observable<Task> {
        return this.http.get<Task>(`${this.apiUrl}/${taskId}`).pipe(
            switchMap(task => {
                task.assignees = task.assignees.filter(person => person.id !== personId);
                return this.updateTask(task);
            })
        );
    }

    toggleTaskCompletion(taskId: number): Observable<Task> {
        return this.http.get<Task>(`${this.apiUrl}/${taskId}`).pipe(
            switchMap(task => {
                task.completed = !task.completed;
                return this.updateTask(task);
            })
        );
    }


    addSkill(taskId: number, personId: number, skill: string): Observable<void> {
        return new Observable(observer => {
            this.getTasks().subscribe(tasks => {
                const task = tasks.find(t => t.id === taskId);
                if (task) {
                    const person = task.assignees.find(p => p.id === personId);
                    if (person) {
                        if (!person.skills.includes(skill)) {
                            person.skills.push(skill);
                            this.updateTask(task).subscribe(() => {
                                observer.next();
                                observer.complete();
                            });
                        } else {
                            observer.error('La habilidad ya existe.');
                            observer.complete();
                        }
                    } else {
                        observer.error('Persona no encontrada.');
                        observer.complete();
                    }
                } else {
                    observer.error('Tarea no encontrada.');
                    observer.complete();
                }
            });
        });
    }

    removeSkill(taskId: number, personId: number, skill: string): Observable<void> {
        return new Observable(observer => {
            this.getTasks().subscribe(tasks => {
                const task = tasks.find(t => t.id === taskId);
                if (task) {
                    const person = task.assignees.find(p => p.id === personId);
                    if (person) {
                        const skillIndex = person.skills.indexOf(skill);
                        if (skillIndex > -1) {
                            person.skills.splice(skillIndex, 1);
                            this.updateTask(task).subscribe(() => {
                                observer.next();
                                observer.complete();
                            });
                        } else {
                            observer.error('La habilidad no existe.');
                            observer.complete();
                        }
                    } else {
                        observer.error('Persona no encontrada.');
                        observer.complete();
                    }
                } else {
                    observer.error('Tarea no encontrada.');
                    observer.complete();
                }
            });
        });
    }

}
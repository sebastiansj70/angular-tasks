import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'assignedPerson', 'skills', 'dueDate', 'completed', 'actions'];

    dataSource: MatTableDataSource<Task>;

    @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator

    constructor(private taskService: TaskService) {
        this.dataSource = new MatTableDataSource<Task>([]);
    }


    ngOnInit(): void {
        this.loadTasks();
    }

    loadTasks(): void {
        this.taskService.getTasks().subscribe(data => {
            this.dataSource.data = data.tasks;
            this.dataSource.paginator = this.paginator;
        });
    }

    toggleCompletion(taskId: number): void {
        this.taskService.toggleTaskCompletion(taskId).subscribe(() => {
            this.loadTasks();
        });
    }

    removeTask(taskId: number): void {
        // this.taskService.removeTask(taskId).subscribe(() => {
        //     this.loadTasks(); // Recargar tareas después de eliminar
        // });
    }
}

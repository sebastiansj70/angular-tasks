import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'assignedPerson', 'skills', 'dueDate', 'completed', 'actions'];
    dataSource: MatTableDataSource<Task>;

    @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

    constructor(private taskService: TaskService, private dialog: MatDialog) {
        this.dataSource = new MatTableDataSource<Task>([]);
    }

    ngOnInit(): void {
        this.loadTasks();
    }

    loadTasks(): void {
        this.taskService.getTasks().subscribe(tasks => {
            this.dataSource.data = tasks;
            this.dataSource.paginator = this.paginator;
        });
    }

    toggleCompletion(taskId: number): void {
        this.taskService.toggleTaskCompletion(taskId).subscribe(() => {
            this.loadTasks();
        });
    }

    confirmDeleteTask(task: Task): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: { task }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.removeTask(task.id);
            }
        });
    }

    removeTask(taskId: number): void {
        this.taskService.removeTask(taskId).subscribe(() => {
            this.loadTasks();
        });
    }

    openEditTaskModal(task: Task): void {
        const dialogRef = this.dialog.open(TaskModalComponent, {
            data: { ...task }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.updateTask(result);
            }
        });
    }

    openCreateTaskModal(): void {
        const dialogRef = this.dialog.open(TaskModalComponent, {
            data: { title: '', description: '', completed: false, dueDate: null, assignees: [] }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const formattedTask = this.formatTask(result);
                this.createTask(formattedTask);
            }
        });
    }

    createTask(newTask: Task): void {
        this.taskService.addTask(newTask).subscribe(() => {
            this.loadTasks();
        });
    }

    updateTask(updatedTask: Task): void {
        this.taskService.updateTask(updatedTask).subscribe(() => {
            this.loadTasks();
        });
    }

    formatTask(task: Task): Task {
        return {
            ...task,
            assignees: task.assignees || [],
            dueDate: task.dueDate ? this.formatDate(task.dueDate) : ''
        };
    }

    formatDate(date: string | Date): string {
        const newDate = new Date(date);
        return newDate.toISOString().split('T')[0];
    }
}

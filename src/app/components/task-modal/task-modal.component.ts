import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-task-modal',
    templateUrl: './task-modal.component.html',
    styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent {
    isEditMode: boolean;

    constructor(
        public dialogRef: MatDialogRef<TaskModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.isEditMode = !!data.id;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    updateTask() {
        this.dialogRef.close(this.data);
    }
}

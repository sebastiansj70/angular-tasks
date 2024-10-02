import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Person } from 'src/app/models/person.model';
import { Task } from 'src/app/models/task.model';

@Component({
    selector: 'app-task-modal',
    templateUrl: './task-modal.component.html',
    styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent {
    isEditMode: boolean;
    skills: string[] = ['JavaScript', 'Angular'];

    constructor(
        public dialogRef: MatDialogRef<TaskModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Task
    ) {
        this.isEditMode = !!data.id;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    updateTask(): void {
        this.dialogRef.close(this.data);
    }

    removePerson(index: number): void {
        this.data.assignees.splice(index, 1);
    }

    addSkill(person: Person): void {
        person.skills.push('');
    }

    removeSkill(person: Person, skillIndex: number): void {
        if (skillIndex >= 0 && skillIndex < person.skills.length) {
            person.skills.splice(skillIndex, 1);
        }
    }

    updateSkills(newSkills: string[]) {
        this.skills = newSkills;
    }

    addPerson() {
        const newPerson: Person = {
            id: 1,
            fullName: '',
            age: 1,
            skills: []
        };
        this.data.assignees.push(newPerson);
    }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-skill-chips',
    templateUrl: './skill-chips.component.html',
    styleUrls: ['./skill-chips.component.scss']
})
export class SkillChipsComponent {
    @Input() skills: string[] = [];
    @Output() skillsChange = new EventEmitter<string[]>();

    addSkill(event: any): void {
        const skill = event.value.trim();
        if (skill) {
            this.skills.push(skill);
            this.skillsChange.emit(this.skills);
        }
    }

    removeSkill(skill: string): void {
        const index = this.skills.indexOf(skill);
        if (index >= 0) {
            this.skills.splice(index, 1);
            this.skillsChange.emit(this.skills);
        }
    }
}

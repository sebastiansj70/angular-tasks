import { Person } from "./person.model";

export interface Task {
    id: number;
    title: string;
    description?: string;
    dueDate: string;
    completed: boolean;
    assignees: Person[];
}
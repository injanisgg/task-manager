export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    created_at: string;
}

export interface TaskCreate {
    title: string;
    description?: string;
}

export interface TaskUpdate {
    title?: string;
    description?: string;
    completed?: boolean;
}
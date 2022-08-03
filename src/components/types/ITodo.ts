export interface ITodo {
    id: number;
    text: string;
    completed: boolean;
    edit: boolean;
    disableButtons: boolean;
    colorId: number;
}

export interface ITodoFetch {
    id: number;
    text: string;
    isCompleted: boolean;
    createdAt: Date | string;
}


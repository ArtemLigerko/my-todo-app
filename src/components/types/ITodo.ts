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

// "id":1,
// "text":"Nunc purus. Phasellus in felis.",
// "isCompleted":true,
// "createdAt":"6/29/2022"
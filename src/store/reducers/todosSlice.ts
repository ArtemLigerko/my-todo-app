//Types
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../../components/types/ITodo";


//Types
interface IEditTodo {
    id: number;
    text: string;
    isEdit: boolean;
    editText: string;
}
// interface ITodosFilter { 
//     todos: ITodo[];
//     filterItem: any;
// }


const initialState: ITodo[] = [];

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers:
    {
        putTodos: (state, action: PayloadAction<ITodo[]>) => {
            return state = action.payload.slice();
        },
        addTodo: (state, action: PayloadAction<string>) => {
            state.push(
                {
                    id: Math.random() * 1000,
                    text: action.payload,
                    completed: false,
                    edit: false,
                    disableButtons: false,
                    colorId: Math.round(Math.random() * 10),
                }
            )
        },

        fetchTodo: (state, action: PayloadAction<ITodo[]>) => {
            state.push(...action.payload);
        },

        clearTodos: (state) => {
            return state = [];
        },

        doneTodo: (state, action: PayloadAction<Number>) => {
            const doneTodos = state.map(item => {
                if (item.id === action.payload) {
                    return {
                        ...item, completed: !item.completed,
                    };
                }
                return item;
            })
            return state = doneTodos.slice();
        },

        deleteTodo: (state, action: PayloadAction<Number>) => {
            const deleteTodos = state.filter(el => el.id !== action.payload);
            return state = deleteTodos.slice();
        },

        editTodo: (state, action: PayloadAction<IEditTodo>) => {
            const { id, text, isEdit, editText } = action.payload;
            const editTodos = state.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        edit: !item.edit,
                        text: isEdit ? editText : text,
                    }
                }
                if (item.id !== id) {
                    return {
                        ...item,
                        disableButtons: !item.disableButtons,
                    }
                }
                return item;
            });
            return state = editTodos.slice();
        },

        // todosFilter:
        // (state, action: PayloadAction<string>) => {
        //     console.log(action.payload);
        //     switch (action.payload) {
        //         case "Completed":
        //             return state.filter((item: ITodo) => item.completed === true);
        //         case "Uncompleted":
        //             return state.filter((item: ITodo) => item.completed === false);
        //         default:
        //             return state;
        //     }
        // }
    },
});

export const {
    putTodos,
    addTodo,
    fetchTodo,
    clearTodos,
    doneTodo,
    deleteTodo,
    editTodo,
    // todosFilter,
} = todosSlice.actions;

export default todosSlice.reducer;
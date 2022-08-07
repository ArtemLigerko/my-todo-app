//Redux-Slice
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
//Types
import { ITodo } from "../../components/types/ITodo";


interface ITodosFilter {  
    todos: ITodo[];
    filter: string;
}

const initialState: ITodo[] = [];

export const todosFilterSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todosFilter:
        (state, action: PayloadAction<ITodosFilter>) => {
            const { todos, filter } = action.payload;
            switch (filter) {
                case "Completed":
                    return state = todos.filter((item: ITodo) => item.completed === true);
                case "Uncompleted":
                    return state = todos.filter((item: ITodo) => item.completed === false);
                default:
                    return state = todos;
            }
        }
    }
});

export const { todosFilter } = todosFilterSlice.actions;

export default todosFilterSlice.reducer;

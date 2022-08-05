//Redux-Slice
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
//Types
import { ITodo } from "../../components/types/ITodo";

const initialState: ITodo[] = [];

interface ITodosFilter {  //если в action поступают данные разных типов, то необходимо создавать interface для каждого action
    todos: ITodo[];
    filter: string;
}


export const todosFilterSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todosFilterActionSlice: (state, action: PayloadAction<any>) => {
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

export const { todosFilterActionSlice } = todosFilterSlice.actions;

export default todosFilterSlice.reducer;

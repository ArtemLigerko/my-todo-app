//Redux-Slice
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
//Types
import { ITodo } from "../../components/types/ITodo";


interface ITodosFilter {  //если в action поступают данные разных типов, то необходимо создавать interface для каждого action
    todos?: ITodo[];
    filter?: string;
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
                    return state = todos.filter((item: ITodo) => item.completed === true).slice();
                case "Uncompleted":
                    return state = todos.filter((item: ITodo) => item.completed === false).slice();
                default:
                    return state = todos.slice();
            }
            // return state;
        }
    }
});

export const { todosFilter } = todosFilterSlice.actions;

export default todosFilterSlice.reducer;

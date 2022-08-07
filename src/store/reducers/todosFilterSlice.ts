//Redux-Slice
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
//Types
import { ITodo } from "../../components/types/ITodo";

const initialState: ITodo[] = [];

interface ITodosFilter {  //если в action поступают данные разных типов, то необходимо создавать interface для каждого action
    todos: ITodo[];
    // filter?: string;
}


export const todosFilterSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todosFilter:
            (state, action: PayloadAction<ITodosFilter>) => {
                // console.log(filter, todos);
                // switch (filter) {
                //     case "Completed":
                //         state = todos.filter((item: ITodo) => item.completed === true).slice();
                //     case "Uncompleted":
                //         state = todos.filter((item: ITodo) => item.completed === false).slice();
                //     default:
                //         state = todos.slice();
                // }
                // state = action.payload;
            }
    }
});

export const { todosFilter } = todosFilterSlice.actions;

export default todosFilterSlice.reducer;

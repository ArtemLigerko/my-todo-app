//Types:
import { ITodo } from "../../components/types/ITodo";

const initialState: ITodo[] = [];

const SEARCH_FILTERED_TODOS: string = "SEARCH_FILTERED_TODOS";

interface ISearchFilteredTodos {
    type: string;
    todos: ITodo[];
    searchText: any;
}

export const todosSearchFilterReducer = (state = initialState, action: ISearchFilteredTodos): ITodo[] => {
    
    switch (action.type) {
        case SEARCH_FILTERED_TODOS:
            // console.log(action.todos);
            // return action.todos.filter((todo: ITodo) => todo.text.indexOf(action.searchText) > 0);
            return action.todos;
        default:
            return state;
    }
}

//Actions
export const searchFilteredTodos = (todos: ITodo[], searchText: any) => ({
    type: SEARCH_FILTERED_TODOS,
    todos,
    searchText
});


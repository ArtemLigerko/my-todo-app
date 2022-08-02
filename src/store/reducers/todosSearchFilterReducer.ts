import { ITodo } from "../../components/types/ITodo";

const initialState: ITodo[] = [];

const SEARCH_FILTERED_TODOS: string = "SEARCH_FILTERED_TODOS";

interface SearchFilteredTodos {
    type: string;
    searchText: any;
}

export const todosSearchFilterReducer = (state = initialState, action: SearchFilteredTodos): ITodo[] => {
    switch (action.type) {
        case SEARCH_FILTERED_TODOS:
            console.log(action.searchText);
            return state.filter((todo: ITodo) => todo.text.indexOf(action.searchText) > 0);

        default:
            return state;
    }
}

//Actions
export const searchFilteredTodos = (searchText: any) => ({
    type: SEARCH_FILTERED_TODOS,
    searchText
});


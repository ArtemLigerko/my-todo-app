import { ITodo } from "../../components/types/ITodo";

const initialState: ITodo[] = [];

enum TodosFilterTypes {
    FILTER = "FILTER",
    SEARCH_FILTER = "SEARCH_FILTERED_TODOS",
}


interface ITodosFilter {  //если в action поступают данные разных типов, то необходимо создавать interface для каждого action
    type: string;
    todos: ITodo[];
    filter: string;
}

interface ISearchFilter {
    type: string;
    todos: ITodo[];
    searchText: string;
}

type TodosFilter = ITodosFilter | ISearchFilter;

export const todosFilterReducer = (state = initialState, action: TodosFilter): ITodo[] => {
    switch (action.type) {
        case TodosFilterTypes.FILTER:

            switch (action.filter) {
                case "Completed":
                    return action.todos.filter((item: ITodo) => item.completed === true);
                case "Uncompleted":
                    return action.todos.filter((item: ITodo) => item.completed === false);
                default:
                    return action.todos;
            }

        case TodosFilterTypes.SEARCH_FILTER:
            console.log(action.searchText);
            return state.filter((todo: ITodo) => todo.text.indexOf(action.searchText) > 0);

        default:
            return state;
    }
}

//Actions
export const filterTodos = (todos: ITodo[], filter: string) => ({ 
    type: TodosFilterTypes.FILTER, 
    todos, 
    filter });
export const searchFilterAction = (todos: ITodo[], searchText: string) => ({
    type: TodosFilterTypes.SEARCH_FILTER,
    todos,
    searchText
});

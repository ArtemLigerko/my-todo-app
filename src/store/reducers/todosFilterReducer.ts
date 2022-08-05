import { ITodo } from "../../components/types/ITodo";

const initialState: ITodo[] = [];

enum TodosFilterTypes {
    FILTER = "FILTER",
}


interface ITodosFilter {  //если в action поступают данные разных типов, то необходимо создавать interface для каждого action
    type: string;
    todos: ITodo[];
    filter: string;
}


type TodosFilter = ITodosFilter;

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

        default:
            return state;
    }
}

//Actions
export const todosFilter = (todos: ITodo[], filter: string) => ({ 
    type: TodosFilterTypes.FILTER, 
    todos, 
    filter });

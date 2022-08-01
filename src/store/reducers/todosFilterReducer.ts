import { ITodo } from "../../components/types/ITodo";

const initialState: ITodo[] = [];

const FILTER: string = "FILTER";

interface todosFilterAction {  //если в action поступают данные разных типов, то необходимо создавать interface для каждого action
    type: string;
    todos: ITodo[];
    filter: string;
}

export const todosFilterReducer = (state = initialState, action: todosFilterAction): ITodo[] => {
    switch (action.type) {
        case FILTER:

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
export const filterTodos = (todos: ITodo[], filter: string) => ({ type: FILTER, todos, filter });


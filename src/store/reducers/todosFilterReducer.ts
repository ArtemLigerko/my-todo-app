import { ITodo } from "../../components/types/ITodo";

const initialState: ITodo[] = [];

const FILTER = "FILTER";

interface todosFilterAction {  //если в action поступают данные разных типов, то необходимо создавать interface для каждого action
    type: string;
    payload: ITodo[];
}

export const todosFilterReducer = (state = initialState, action: todosFilterAction) => {
    switch (action.type) {
        case FILTER:
            const completedTodos = state.slice();
            return completedTodos;
        default:
            return state;
    }
}

//Actions
export const filterTodos = (payload: string) => ({ type: FILTER, payload });

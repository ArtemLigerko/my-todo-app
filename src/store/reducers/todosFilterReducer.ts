


const defaultState: any = [];

const FILTER = "FILTER";

interface todosFilterAction {  //если в action поступают данные разных типов, то необходимо создавать interface для каждого action
    type: string;
    payload?: any;
}

export const todosFilterReducer = (state = defaultState, action: todosFilterAction) => {
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

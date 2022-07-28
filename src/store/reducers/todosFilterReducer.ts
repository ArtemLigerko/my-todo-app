


const defaultState: any = [];

const FILTER = "FILTER";
// const FILTER_COMPLETED = "FILTER_COMPLETED";
// const FILTER_UNCOMPLETED = "FILTER_UNCOMPLETED";


interface todosFilterAction {  //если в action поступают данные разных типов, то необходимо создавать interface для каждого action
    type: string;
    payload?: string;
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
export const addFilter = (payload: string) => ({ type: FILTER, payload });

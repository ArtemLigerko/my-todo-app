const defaultState = {

}

const ADD_TODO = "ADD_TODO";

const todoReducer = (state = defaultState, action) => {
    switch(action.type) {
        case ADD_TODO:
            return 0;

        default:
            return state;
    }
}
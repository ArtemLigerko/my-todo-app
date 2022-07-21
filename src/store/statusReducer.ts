const defaultState = "All";

const FILTER_COMPLETED = "FILTER_COMPLETED";
const FILTER_UNCOMPLETED = "FILTER_UNCOMPLETED";

const statusReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FILTER_COMPLETED:
            return 0;
        case FILTER_UNCOMPLETED:
            return 0;


        default:
            return state;
    }
}
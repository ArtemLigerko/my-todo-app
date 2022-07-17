const defaultState = {
  counterCreated: 0,
  counterUpdated: 0,
  counterDeleted: 0,
}

const CREATE_COUNT = "CREATE_COUNT";
const UPDATE_COUNT = "UPDATE_COUNT";
const DELETE_COUNT = "DELETE_COUNT";

export const statisticReducer = (state = defaultState, action) => {  // action = {type: "", payload: "?"}
  switch (action.type) {
    case CREATE_COUNT:
      return { ...state, counterCreated: state.counterCreated + action.payload }
    case UPDATE_COUNT:
      return { ...state, counterUpdated: state.counterUpdated + action.payload }
    case DELETE_COUNT:
      return { ...state, counterDeleted: state.counterDeleted + action.payload }

    default:
      return state;
  }
}

export const addCreateCountAction = (payload) => ({type: CREATE_COUNT, payload});
export const addUpdateCountAction = (payload) => ({type: UPDATE_COUNT, payload});
export const addDeleteCountAction = (payload) => ({type: DELETE_COUNT, payload});

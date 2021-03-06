import { ITodo } from '../../components/types/ITodo'

// const defaultState: ITodo[] = [];

const ADD_TODO = "ADD_TODO";
const FETCH_TODOS = "FETCH_TODOS";
const CLEAR_TODOS = "CLEAR_TODOS";
const DONE_TODO = "DONE_TODO";
const DELTE_TODO = "DELETE_TODO";
const EDIT_TODO = "EDIT_TODO";
const MOVE_TODOS = "MOVE_TODOS";


export const todosReducer = (state = [], action) => {
    switch(action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    id: Math.random() * 1000,
                    text: action.text,
                    completed: false,
                    edit: false,
                    disableButtons: false,
                    colorId: Math.round(Math.random() * 10),
                    // index: 1,
                }
            ];

        default:
            return state;
    }
}

//Actions
export const addTodo = (text: string) => ({ type: ADD_TODO, text });

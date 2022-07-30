// import { ITodo } from '../../components/types/ITodo'

//Types
enum TodosActionTypes {
    PUT_TODOS = "PUT_TODOS",
    GET_LOCALSTORAGE_TODOS = "GET_LOCALSTORAGE_TODOS",
    ADD_TODO = "ADD_TODO",
    FETCH_TODOS = "FETCH_TODOS",
    CLEAR_TODOS = "CLEAR_TODOS",
    DONE_TODO = "DONE_TODO",
    DELETE_TODO = "DELETE_TODO",
    EDIT_TODO = "EDIT_TODO",
    MOVE_TODOS = "MOVE_TODOS",
}       // для типизации на замену typeof ADD_TODO...

//Types
interface putTodos {
    type: TodosActionTypes.PUT_TODOS,
    payload?: any,
}
interface getLocalStorageTodos {
    type: TodosActionTypes.GET_LOCALSTORAGE_TODOS,
    payload?: any,
}
interface AddTodo {
    type: TodosActionTypes.ADD_TODO,
    payload?: string,
}
interface FetchTodo {
    type: TodosActionTypes.FETCH_TODOS,
    payload?: any,
}
interface ClearTodos {
    type: TodosActionTypes.CLEAR_TODOS,
}
interface DoneTodo {
    type: TodosActionTypes.DONE_TODO,
    payload?: number,
}
interface DeleteTodo {
    type: TodosActionTypes.DELETE_TODO,
    payload?: number,
}
interface EditTodo {
    type: TodosActionTypes.EDIT_TODO,
    id?: number,
    text?: string,
    edit?: boolean,
    editText: string,
}
interface MoveTodo {
    type: TodosActionTypes.MOVE_TODOS,
    payload?: any,
}

type TodoAction = putTodos | getLocalStorageTodos | AddTodo | FetchTodo | ClearTodos |
    DoneTodo | DeleteTodo | EditTodo | MoveTodo;

// const defaultState: ITodo = {
//     id: null,
//     text: '',
//     completed: false,
//     edit: false,
//     disableButtons: false,
//     colorId: null,
// };


export const todos = (state = [], action: TodoAction): any => {
    switch (action.type) {
        case TodosActionTypes.PUT_TODOS:
            return action.payload;

        case TodosActionTypes.GET_LOCALSTORAGE_TODOS:
            return action.payload;

        case TodosActionTypes.ADD_TODO:
            return [
                ...state,
                {
                    id: Math.random() * 1000,
                    text: action.payload,
                    completed: false,
                    edit: false,
                    disableButtons: false,
                    colorId: Math.round(Math.random() * 10),
                }
            ];


        case TodosActionTypes.FETCH_TODOS:
            return [
                ...state,
                ...action.payload,
            ]

        case TodosActionTypes.CLEAR_TODOS:
            return [];

        case TodosActionTypes.DONE_TODO:
            return (
                state.map(item => {
                    if (item.id === action.payload) {
                        return {
                            ...item, completed: !item.completed,
                        };
                    }
                    return item;
                })
            )

        case TodosActionTypes.DELETE_TODO:
            return state.filter(el => el.id !== action.payload);

        case TodosActionTypes.EDIT_TODO:
            return state.map(item => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        edit: !item.edit,
                        text: action.edit ? action.editText : action.text,
                    }
                }
                if (item.id !== action.id) {
                    return {
                        ...item,
                        disableButtons: !item.disableButtons,
                    }
                }
                return item;
            });

        default:
            return state;
    }
}

//Actions
export const putTodos = (payload: any) => ({ type: TodosActionTypes.PUT_TODOS, payload });
export const getLocalStorageTodos = (payload: any) => ({ type: TodosActionTypes.GET_LOCALSTORAGE_TODOS, payload });
export const addTodo = (payload: string) => ({ type: TodosActionTypes.ADD_TODO, payload });
export const fetchTodo = (payload: any) => ({ type: TodosActionTypes.FETCH_TODOS, payload })
export const clearTodos = () => ({ type: TodosActionTypes.CLEAR_TODOS });
export const doneTodo = (payload: number) => ({ type: TodosActionTypes.DONE_TODO, payload });
export const deleteTodo = (payload: number) => ({ type: TodosActionTypes.DELETE_TODO, payload });
export const editTodo = (id: number, text: string, edit: boolean, editText: string) => (
    { type: TodosActionTypes.EDIT_TODO, id, text, edit, editText }
);

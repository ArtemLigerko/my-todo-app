//React:
import React from "react";
//Components:
import Todo from './Todo';
//Types:
// import { ITodo } from './types/ITodo';
//Redux:
import { useTypedSelector } from "../hooks/useTypedSelector";
//Redux-Actions:
// import { searchFilteredTodos } from '../store/reducers/todosSearchFilterReducer';


interface ITodoList {
    setDisableInputButton: React.Dispatch<React.SetStateAction<boolean>>;
    disableInputButton: boolean;
    todoIndexOf: number;
    setTodoIndexOf: React.Dispatch<React.SetStateAction<number>>;
}

const TodoList: React.FC<ITodoList> = ({
    setDisableInputButton,
    disableInputButton,
    todoIndexOf,
    setTodoIndexOf
}) => {

    const filteredTodos = useTypedSelector(state => state.todosFilter);
    // const filteredTodos = useTypedSelector(state => state.todosSearchFilter);
    
    return (
        <div>
            <div className="todoListWrapper">
                {filteredTodos.map((todo) => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        setDisableInputButton={setDisableInputButton}
                        disableInputButton={disableInputButton}
                        todoIndexOf={todoIndexOf}
                        setTodoIndexOf={setTodoIndexOf}
                    />
                ))}
            </div>
        </div>
    )
};

export default TodoList;
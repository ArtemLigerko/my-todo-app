//React:
import React from "react";
//Components:
import Todo from './Todo'
//Types:
import { ITodo } from './types/ITodo'


interface ITodoList {
    completedTodos: ITodo[],
    setDisableInputButton: React.Dispatch<React.SetStateAction<boolean>>,
    disableInputButton: boolean,
    // todoIndexOf: number,
    // setTodoIndexOf: React.Dispatch<React.SetStateAction<number>>,
}

const TodoList: React.FC<ITodoList> = ({
    completedTodos,
    setDisableInputButton,
    disableInputButton,
    // todoIndexOf,
    // setTodoIndexOf
}) => {

    return (
        <div>
            <div className="todoListWrapper">
                {completedTodos.map((todo) => (
                    <Todo
                        // text={todo.text}
                        key={todo.id}
                        todo={todo}
                        setDisableInputButton={setDisableInputButton}
                        disableInputButton={disableInputButton}
                        // todoIndexOf={todoIndexOf}
                        // setTodoIndexOf={setTodoIndexOf}
                    />
                ))}
            </div>
        </div>
    )
};

export default TodoList;
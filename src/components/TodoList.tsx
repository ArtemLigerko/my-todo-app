//React:
import React from "react";
//Components:
import Todo from './Todo';
//Types:
import { ITodo } from './types/ITodo';
//Redux:
import { useTypedSelector } from "../hooks/useTypedSelector";


interface ITodoList {
    // completedTodos: ITodo[];
    setDisableInputButton: React.Dispatch<React.SetStateAction<boolean>>;
    disableInputButton: boolean;
    todoIndexOf: number;
    setTodoIndexOf: React.Dispatch<React.SetStateAction<number>>;
}

const TodoList: React.FC<ITodoList> = ({
    // completedTodos,
    setDisableInputButton,
    disableInputButton,
    todoIndexOf,
    setTodoIndexOf
}) => {

    const filteredTodos = useTypedSelector(state => state.todosFilter);

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
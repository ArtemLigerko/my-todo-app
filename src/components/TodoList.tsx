import React from "react";
import Todo from './Todo'
// import styled from 'styled-components';
import { ITodo } from './types/ITodo'
import { Icounter } from "./types/Icounter";
// import { TodoListWrapper } from './styles/TodoList'


interface ITodoList {
    todos: ITodo[],
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>,
    completedTodos: ITodo[],
    setEditText: React.Dispatch<React.SetStateAction<string>>,
    editText: string,
    setDisableInputButton: React.Dispatch<React.SetStateAction<boolean>>,
    disableInputButton: boolean,
    setCounter: React.Dispatch<React.SetStateAction<Icounter>>,
    counter: Icounter,
    todoIndexOf: number,
    setTodoIndexOf: React.Dispatch<React.SetStateAction<number>>,
}

const TodoList: React.FC<ITodoList> = ({
    todos,
    setTodos,
    completedTodos,
    setEditText,
    editText,
    setDisableInputButton,
    disableInputButton,
    setCounter,
    counter,
    todoIndexOf,
    setTodoIndexOf
}) => {
    return (
        <div className="todoListWrapper">
            {/* <TodoListWrapper> */}
            {completedTodos.map((todo) => (
                <Todo
                    text={todo.text}
                    key={todo.id}
                    todo={todo}
                    todos={todos}
                    setTodos={setTodos}
                    setEditText={setEditText}
                    editText={editText}
                    setDisableInputButton={setDisableInputButton}
                    disableInputButton={disableInputButton}
                    setCounter={setCounter}
                    counter={counter}
                    todoIndexOf={todoIndexOf}
                    setTodoIndexOf={setTodoIndexOf}
                />
            ))}
            {/* </TodoListWrapper> */}
        </div>
    )
};

export default TodoList;
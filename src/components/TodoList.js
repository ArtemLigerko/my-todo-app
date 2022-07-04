import React from "react";
import Todo from './Todo'
import styled from 'styled-components';

const TodoListWrapper = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: left;
    padding: 0;
    margin: 10px 0;
`

function TodoList({
    todos, setTodos, completedTodos, setEditText, editText, 
    setDisableInputButton, disableInputButton, setCounter, counter }) {
    return (
        <div>
            <TodoListWrapper>
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
                    />
                ))}
            </TodoListWrapper>
        </div>
    )
};

export default TodoList;
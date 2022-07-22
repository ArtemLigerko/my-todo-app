import React from "react";
import Todo from './Todo'
import styled from 'styled-components';

// const TodoListWrapper = styled.ul`
//     display: flex;
//     flex-direction: column;
//     align-items: left;
//     padding: 0;
//     margin: 10px 0;
// `

const TodoList: React.FC = ({
    todos, setTodos, completedTodos, setEditText, editText,
    setDisableInputButton, disableInputButton, setCounter, counter,
    todoIndexOf, setTodoIndexOf }) => {
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
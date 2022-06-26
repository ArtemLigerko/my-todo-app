import React from "react";
import Todo from './Todo'

function TodoList({
    todos, setTodos, completedTodos, setEditText, editText, 
    setDisableInputButton, disableInputButton, setCounter, counter }) {
    return (
        <div>
            <ul className="todo-list">
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
            </ul>
        </div>
    )
};

export default TodoList;
import React from "react";
import Todo from './Todo'

function TodoList({
    todos, setTodos, completedTodos, setEditText, editText, setDisableInputButton, disableInputButton }) {
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
                    />
                ))}
            </ul>
        </div>
    )
};

export default TodoList;
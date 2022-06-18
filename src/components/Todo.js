import React from "react";

function Todo({ text, todos, setTodos, todo }) {
    const deleteHandler = () => {
        setTodos(todos.filter((el) => el.id !== todo.id));
    }

    const completedHandler = () => {
        // console.log( todos.filter((el) => el.id === todo.id) );
        setTodos(todos.map((item) => {
            if (item.id === todo.id) {
                return {
                    ...item, completed: !item.completed,
                };
            }
            return item;
        }))
    }


    return (
        <div className="todo">
            <li className={todo.completed ? "todoCompleted" : ""}>{text}</li>
            <button onClick={completedHandler}>
                V
            </button>
            <button onClick={deleteHandler}>
                X
            </button>
        </div>
    )

}

export default Todo;
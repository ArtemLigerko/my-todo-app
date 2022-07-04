import React from "react";
import styled from "styled-components";

//Style:
const TodoButton = styled.button`
    font-size: 1rem;
    width: 2.2rem;
    height: 2rem;
    border: none;
    cursor: pointer;
    background-color: rgb(100, 255, 212);
    color: rgb(120, 120, 120);
`

function Todo({ text, todos, setTodos, todo, setEditText, editText,
    setDisableInputButton, disableInputButton, setCounter, counter }) {

    const deleteHandler = () => {
        setTodos(todos.filter((el) => el.id !== todo.id));
        setCounter({
            counterCreated: counter.counterCreated,
            counterUpdated: counter.counterUpdated,
            counterDeleted: counter.counterDeleted + 1,
        })

    }

    const completedHandler = () => {
        setTodos(todos.map((item) => {
            if (item.id === todo.id) {
                return {
                    ...item, completed: !item.completed,
                };
            }
            return item;
        }));
    }

    const handleEditClick = () => {
        setEditText(todo.text);
        setTodos(todos.map((item) => {
            if (item.id === todo.id) {
                return {
                    ...item,
                    edit: !item.edit,
                    text: todo.edit ? editText : todo.text,
                }
            }
            if (item.id !== todo.id) {
                return {
                    ...item,
                    disableButtons: !item.disableButtons,
                }
            }
            return item;
        }));
        setDisableInputButton(!disableInputButton);
        setCounter({
            counterCreated: counter.counterCreated,
            counterUpdated: todo.edit ? counter.counterUpdated + 1 : counter.counterUpdated,
            counterDeleted: counter.counterDeleted,
        });

    }

    const inputEditTextHandler = (e) => {
        setEditText(e.target.value);
    }

    const handleTodoMoveUp = () => {
        if (todos.indexOf(todo) > 0) {
            setTodos(todos.slice(
                todos.splice(
                    (todos.indexOf(todo) - 1), 2,
                    todos[todos.indexOf(todo)],
                    todos[todos.indexOf(todo) - 1]
                )
            ));
        }
    }

    const handleTodoMoveDown = () => {
        if (todos.indexOf(todo) < todos.length - 1) {
            setTodos(todos.slice(
                todos.splice(
                    (todos.indexOf(todo)), 2,
                    todos[todos.indexOf(todo) + 1],
                    todos[todos.indexOf(todo)]
                )
            ));
        }
    }

    return (
        <div className="todo">
            <div className="todoUpDownButtons" >
                <button
                    className="todoUpDownButton rotate"
                    onClick={handleTodoMoveUp}
                >
                    <b>v</b>
                </button>
                <button
                    className="todoUpDownButton"
                    onClick={handleTodoMoveDown}
                >
                    <b>v</b>
                </button>
            </div>
            {
                todo.edit ?
                    <input
                        className="todoEditInput"
                        type="text"
                        defaultValue={text}
                        onChange={inputEditTextHandler}
                    /> :
                    <li className={todo.completed ? "todoCompleted" : ""}>{text}</li>
            }

            <button
                className={todo.disableButtons || todo.edit ? "todoButtonDisabled" : "doneTodoButton"}
                onClick={completedHandler}
                disabled={todo.disableButtons || todo.edit}>
                <b>V</b>
            </button>
            <button className={todo.disableButtons || todo.edit ? "todoButtonDisabled" : "delTodoButton"}
                onClick={deleteHandler}
                disabled={todo.disableButtons || todo.edit}>
                <b>X</b>
            </button>
            <button className={todo.disableButtons ? "editTodoButtonDisabled" : "editTodoButton"}
                onClick={handleEditClick}
                disabled={todo.disableButtons}>
                <b>{todo.edit ? 'save' : 'edit'}</b>
            </button>
            <TodoButton>
                <b>V</b>
            </TodoButton>
        </div>
    )
}

export default Todo;
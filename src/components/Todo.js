import React from "react";

function Todo({ text, todos, setTodos, todo, setEditText, editText,
    setDisableInputButton,  disableInputButton, setCounter, counter}) {

    const deleteHandler = () => {
        setTodos(todos.filter((el) => el.id !== todo.id));
        // setCounter([counter[0], counter[1], counter[2] + 1]);
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
        }))
        setDisableInputButton(!disableInputButton);
        // setCounter([counter[0], todo.edit ? (counter[1] + 1) : counter[1], counter[2]]);
        setCounter({
            counterCreated: counter.counterCreated,
            counterUpdated: todo.edit ? counter.counterUpdated + 1 : counter.counterUpdated,
            counterDeleted: counter.counterDeleted,
        })

    }


    const inputEditTextHandler = (e) => {
        setEditText(e.target.value);
    }


    return (
        <div className="todo">
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
        </div>
    )
}

export default Todo;
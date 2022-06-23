import React from "react";

function Todo({ text, todos, setTodos, todo, setEditText, editText }) {
    
    const deleteHandler = () => {
        setTodos(todos.filter((el) => el.id !== todo.id));
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
    }


    const inputEditTextHandler = (e) => {
        setEditText(e.target.value);
    }


    return (
        <div className="todo">
            {
                todo.edit ?
                    <input
                        type="text"
                        defaultValue={text}
                        onChange={inputEditTextHandler}
                    /> :
                    <li className={todo.completed ? "todoCompleted" : ""}>{text}</li>
            }

            <button onClick={completedHandler} disabled={todo.disableButtons || todo.edit}>
                <b>V</b>
            </button>
            <button onClick={deleteHandler} disabled={todo.disableButtons || todo.edit}>
                <b>X</b>
            </button>
            <button onClick={handleEditClick} disabled={todo.disableButtons}>
                <b>{todo.edit ? 'save' : 'edit'}</b>
            </button>
        </div>
    )
}

export default Todo;
import React from "react";

function Todo({ text, todos, setTodos, todo, setEditText, editText, 
    disableEditButtons, setDisableEditButtons, }) {
    
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
                    disableEditButton: !item.disableEditButton,
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
            {/* <li className={todo.completed ? "todoCompleted" : ""}>{text}</li> */}

            {
                todo.edit ?
                    <input
                        type="text"
                        defaultValue={text}
                        onChange={inputEditTextHandler}
                    /> :
                    <li className={todo.completed ? "todoCompleted" : ""}>{text}</li>
            }

            <button onClick={completedHandler} disabled={todo.disableEditButton || todo.edit}>
                <b>V</b>
            </button>
            <button onClick={deleteHandler} disabled={todo.disableEditButton || todo.edit}>
                <b>X</b>
            </button>
            <button onClick={handleEditClick} disabled={todo.disableEditButton}>
                <b>{todo.edit ? 'save' : 'edit'}</b>
            </button>
        </div>
    )
}

export default Todo;
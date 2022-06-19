import React from "react";

function Todo({ text, todos, setTodos, todo, setEditText, editText, setEditTexts, editTexts }) {
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


    const editHandler = () => {
        // console.log(todos.indexOf(todo));
        setEditText(todo.text);
        
        if (todo.edit) {
            setTodos(todos.map((item) => {
                if (item.id === todo.id) {
                    return {
                        ...item, edit: !item.edit, text: editText,
                    }
                }
                return item;
            }))
            
        } else {
            setTodos(todos.map((item) => {
                if (item.id === todo.id) {
                    return {
                        ...item, edit: !item.edit,
                    }
                }
                return item;
            }))
            
        }
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

            <button onClick={completedHandler}>
                <b>V</b>
            </button>
            <button onClick={deleteHandler}>
                <b>X</b>
            </button>
            <button onClick={editHandler}>
                <b>{todo.edit ? 'save' : 'edit'}</b>
            </button>
        </div>
    )
}

export default Todo;
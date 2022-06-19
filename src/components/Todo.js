import React from "react";

function Todo({ text, todos, setTodos, todo, setInputText }) {
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
        setTodos(todos.map((item) => {
            if (item.id === todo.id) {
                return {
                    ...item, edit: !item.edit,
                }
            }
            return item;
        }))
    }

    const saveHandler = () => {
        console.log('save');
        // setInputText(e.target.value);

    }

    return (
        <div className="todo">
            {/* <li className={todo.completed ? "todoCompleted" : ""}>{text}</li> */}
            {/* <input
                // className={todo.completed ? "todoCompleted" : ""}
                type="text"
                value={text}
                // onChange={editHandler}
                // readOnly
                // disabled
                // contenteditable
            /> */}
            {/* {todo.edit ? console.log('save') : console.log('edit')} */}

            {
                todo.edit ?
                    <input type="text" defaultValue={text}/> :
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
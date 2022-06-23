import React from "react";
import '../App.css';

function TodoInputBar({ inputText, setInputText, todos, setTodos, setStatus }) {
    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        setTodos([
            ...todos,
            {
                text: inputText,
                completed: false,
                id: Math.random() * 1000,
                edit: false, editText: '',
                disableEditButton: false,
            }
        ]);
        setInputText("");
    }

    const statusHandler = (e) => {
        setStatus(e.target.value);
    }

    return (
        <form className="todoInputBar">
            <input
                value={inputText}
                onChange={inputTextHandler}
                type="text"
                placeholder="type you task..." />
            <button onClick={submitHandler} type="submit">
                +
            </button>
            <div >
                <select className="select" onChange={statusHandler}>
                    <option>All</option>
                    <option>Completed</option>
                    <option>Uncompleted</option>
                </select>
            </div>
        </form>


    )
}

export default TodoInputBar;
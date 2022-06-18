import React from "react";
import '../App.css';

function TodoInputBar({ inputText, setInputText, todos, setTodos, status, setStatus }) {
    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        setTodos([
            ...todos,
            { text: inputText, completed: false, id: Math.random() * 1000 }
        ]);
        setInputText("");
    }

    const statusHandler = (e) => {
        setStatus(e.target.value);
    }

    return (
        <div className="todoInputBar">
            <form>
                <input
                    value={inputText}
                    onChange={inputTextHandler}
                    type="text"
                    placeholder="type you task..." />
                <button onClick={submitHandler}>+</button>
            </form>
            <select className="select" onChange={statusHandler}>
                <option>All</option>
                <option>Completed</option>
                <option>Uncompleted</option>
            </select>
        </div>


    )
}

export default TodoInputBar;
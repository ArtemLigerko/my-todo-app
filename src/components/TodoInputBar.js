import React from "react";
import '../App.css';

function TodoInputBar({ inputText, setInputText, todos, setTodos, setStatus,
    disableInputButton, setCounter, counter }) {
    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    }
    
    const submitHandler = (e) => {
        e.preventDefault();
        setCounter({
            counterCreated: counter.counterCreated + 1,
            counterUpdated: counter.counterUpdated,
            counterDeleted: counter.counterDeleted,
        })
        setTodos([
            ...todos,
            {
                todoNumber: counter.counterCreated,
                text: inputText,
                id: Math.random() * 1000,
                completed: false,
                edit: false,
                disableButtons: false,
            }
        ]);
        setInputText("");
        // setCounter([counter[0] + 1, counter[1], counter[2]])
    }

    const statusHandler = (e) => {
        setStatus(e.target.value);
    }

    return (
        <form className="todoInputForm">
            <input
                className="inputBar"
                value={inputText}
                onChange={inputTextHandler}
                type="text"
                placeholder="type you task..."
            />
            <button
                className="inputButton"
                onClick={submitHandler}
                type="submit"
                disabled={disableInputButton}
            >
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
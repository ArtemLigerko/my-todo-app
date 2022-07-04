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
                text: inputText,
                id: Math.random() * 1000,
                completed: false,
                edit: false,
                disableButtons: false,
            }
        ]);
        setInputText("");
    }

    const handleClearTodos = (e) => {
        e.preventDefault();
        setTodos([]);
    }

    const statusHandler = (e) => {
        setStatus(e.target.value);
    }

    const handleFetchTodos = (e) => {
        e.preventDefault();
        let url = 'https://gist.githubusercontent.com/alexandrtovmach/0c8a29b734075864727228c559fe9f96/raw/c4e4133c9658af4c4b3474475273b23b4a70b4af/todo-task.json'
        fetch(url)
            .then(response => response.json())
            .then(getTodos => {
                // Change todos from server:
                // setTodos(getTodos.map(item => {
                //     return {
                //         text: item.text,
                //         id: item.id,
                //         completed: item.isCompleted,
                //         edit: false,
                //         disableButtons: false,
                //     }
                // }))

                setTodos([
                    ...todos,
                    ...getTodos.map(item => {
                        return {
                            text: item.text,
                            id: Math.random() * 1000,
                            completed: item.isCompleted,
                            edit: false,
                            disableButtons: false,
                        }
                    })
                ])

            });
    }

    return (
        <form className="todoInputForm">
            <div>
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
            </div>
            <div className="buttons">
                <button
                    onClick={handleFetchTodos}
                    className="getButton"
                >
                    add from server
                </button>
                <button
                    onClick={handleClearTodos}
                    className="getButton"
                >
                    clear all
                </button>

                <div >
                    <select className="select" onChange={statusHandler}>
                        <option>All</option>
                        <option>Completed</option>
                        <option>Uncompleted</option>
                    </select>
                </div>
            </div>
        </form>

    )
}

export default TodoInputBar;
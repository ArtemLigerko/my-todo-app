import React from "react";
import styled from 'styled-components';
import '../App.css';

//Style:
const TodoInputForm = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    border: none;
`
const InputTodoBar = styled.input`
    font-size: 1.2rem;
    margin-bottom: 10px;
    padding-left: 10px;
    width: 400px;
    height: 40px;
    border-style: none;
    border-radius: 5px 0 0 5px;
    /* border: none; */
    background-color: white;
    &:focus {
        outline: none;
    }
`
const AddTodoButton = styled.button`
    font-size: 1.2rem;
    /* line-height: 0; */
    padding: 0;
    width: 40px;
    height: 40px;
    background-color: rgb(255, 175, 25);
    /* border: rgb(252, 218, 155) solid 1px; */
    border: none;
    border-radius: 0 5px 5px 0;
    color: rgb(130, 130, 130);
    cursor: pointer;
`
const OptionButtonsWrapper = styled.div`
    display: flex;
`
const OptionButtons = styled.button`
    font-size: 1rem;
    margin-right: 5px;
    width: 80px;
    height: 40px;
    background-color: rgb(253, 197, 93);
    border-radius: 5px;
    /* border: rgb(252, 218, 155) solid 1px; */
    border: none;
    color: rgb(130, 130, 130);
    cursor: pointer;
`
const AddFromServerButton = styled(OptionButtons)``
const ClearAllButton = styled(OptionButtons)``
const FilterTodoSelector = styled.select`
    font-size: 1.2rem;
    padding: 0.4rem;
    margin-right: 5px;
    height: 40px;
    color: rgb(130, 130, 130);
    background-color: rgb(253, 197, 93);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`


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
                colorId: Math.round(Math.random() * 10),
            }
        ]);
        setInputText("");
    }

    const handleClearTodos = (e) => {
        e.preventDefault();
        setCounter({
            counterCreated: counter.counterCreated,
            counterUpdated: counter.counterUpdated,
            counterDeleted: counter.counterDeleted + todos.length,
        });
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
                setTodos([
                    ...todos,
                    ...getTodos.map(item => {
                        return {
                            text: item.text,
                            id: Math.random() * 1000,
                            completed: item.isCompleted,
                            edit: false,
                            disableButtons: false,
                            colorId: Math.floor(Math.random() * 10),
                        }
                    })
                ]);
                setCounter({
                    counterCreated: counter.counterCreated + getTodos.length,
                    counterUpdated: counter.counterUpdated,
                    counterDeleted: counter.counterDeleted,
                });
            });

    }

    return (
        <TodoInputForm>
            <div>
                <InputTodoBar
                    value={inputText}
                    onChange={inputTextHandler}
                    type="text"
                    placeholder="type you task..."
                />
                <AddTodoButton
                    onClick={submitHandler}
                    type="submit"
                    disabled={disableInputButton}
                >
                    +
                </AddTodoButton>
            </div>
            <OptionButtonsWrapper>
                <AddFromServerButton onClick={handleFetchTodos}>
                    add from server
                </AddFromServerButton>
                <ClearAllButton onClick={handleClearTodos}>
                    clear all
                </ClearAllButton>
                <FilterTodoSelector onChange={statusHandler}>
                    <option>All</option>
                    <option>Completed</option>
                    <option>Uncompleted</option>
                </FilterTodoSelector>
            </OptionButtonsWrapper>
        </TodoInputForm>

    )
}

export default TodoInputBar;
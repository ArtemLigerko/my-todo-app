import React from "react";
import styled, { css } from "styled-components";

//Style:
const TodoLine = styled.div`
    display: flex;
    padding: 0.5rem 0;
    font-size: 1.2rem;
    border-style: none;
`
const UpDownTodoButtonsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const DownTodoButton = styled.button`
    font-size: 1rem;
    width: 2.2rem;
    height: 1rem;
    background-color: rgb(155, 218, 255);
    border: rgb(252, 218, 155) solid;
    border-width: 1px 0 1px 0;
    border-radius: 5px;
    color: rgb(120, 120, 120);
    cursor: pointer;
    line-height: 2px;
`
const UpTodoButton = styled(DownTodoButton)`
    transform: rotate(180deg);
`
const TodoTextArea = styled.li`
    
    background-color: ${props => props.completed ? 'rgb(180, 255, 212)' : 'white'};
    text-decoration-line: ${props => props.completed ? 'line-through' : 'none'}
`
const TodoButtons = styled.button`
    font-size: 1rem;
    width: 2.2rem;
    height: 2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: rgb(120, 120, 120);
    ${'' /* color: ${props => props.color || 'rgb(120, 120, 120)'} */}
    ${'' /* background-color: ${props => props.background || "grey"} */}
`
const DoneTodoButton = styled(TodoButtons)`
    background-color: rgb(100, 255, 212);
    
    ${'' /* ${props => props.buttonEnabled && css`
    `} */}
    ${props => props.buttonDisabled && css`
    background-color: rgb(230, 230, 230);
    color: rgb(180, 180, 180);
    `};
`
const DelTodoButton = styled(TodoButtons)`
    background-color: rgb(255, 144, 100);

    ${props => props.buttonDisabled && css`
    background-color: rgb(230, 230, 230);
    color: rgb(180, 180, 180);
    `};

`
const EditTodoButton = styled(TodoButtons)`
    background-color: rgb(255, 175, 25);
    ${'' /* background-color: ${props => props.background || 'rgb(255, 175, 25)'} */}
    width: 3rem;
    ${props => props.buttonEnabled && css`
    `}
    ${props => props.buttonDisabled && css`
    background-color: rgb(230, 230, 230);
    color: rgb(180, 180, 180);
    `};
`
const TodoEditInput = styled.input`
    padding: 0.3rem;
    width: 400px;
    height: 32px;
    font-size: 1.2rem;
    border-style: dotted;
    border-width: 1.8px;
    &:focus {
        outline: none;
    }
`


const Todo = ({ text, todos, setTodos, todo, setEditText, editText,
    setDisableInputButton, disableInputButton, setCounter, counter }) => {

    const deleteHandler = () => {
        setTodos(todos.filter((el) => el.id !== todo.id));
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
        }));
        setDisableInputButton(!disableInputButton);
        setCounter({
            counterCreated: counter.counterCreated,
            counterUpdated: todo.edit ? counter.counterUpdated + 1 : counter.counterUpdated,
            counterDeleted: counter.counterDeleted,
        });

    }

    const inputEditTextHandler = (e) => {
        setEditText(e.target.value);
    }

    const handleTodoMoveUp = () => {
        if (todos.indexOf(todo) > 0) {
            setTodos(todos.slice(
                todos.splice(
                    (todos.indexOf(todo) - 1), 2,
                    todos[todos.indexOf(todo)],
                    todos[todos.indexOf(todo) - 1]
                )
            ));
        }
    }

    const handleTodoMoveDown = () => {
        if (todos.indexOf(todo) < todos.length - 1) {
            setTodos(todos.slice(
                todos.splice(
                    (todos.indexOf(todo)), 2,
                    todos[todos.indexOf(todo) + 1],
                    todos[todos.indexOf(todo)]
                )
            ));
        }
    }

    return (
        <TodoLine>
            <UpDownTodoButtonsWrapper>
                <UpTodoButton onClick={handleTodoMoveUp}>
                    <b>v</b>
                </UpTodoButton>
                <DownTodoButton onClick={handleTodoMoveDown}>
                    <b>v</b>
                </DownTodoButton>
            </UpDownTodoButtonsWrapper>
            {
                todo.edit ?
                    <TodoEditInput
                        type="text"
                        defaultValue={text}
                        onChange={inputEditTextHandler}
                    /> :
                    //<li className={todo.completed ? "todoCompleted" : ""}>{text}</li>
                    <TodoTextArea completed={todo.completed}>
                        {text}
                    </TodoTextArea>
            }

            {
                todo.disableButtons || todo.edit ?
                    <DoneTodoButton buttonDisabled
                        // {todo.disableButtons || todo.edit ? buttonDisabled : buttonEnabled}
                        onClick={completedHandler}
                        disabled={todo.disableButtons || todo.edit}>
                        <b>V</b>
                    </DoneTodoButton>
                    :
                    <DoneTodoButton
                        onClick={completedHandler}
                        disabled={todo.disableButtons || todo.edit}>
                        <b>V</b>
                    </DoneTodoButton>
            }
            {/* <button
                className={todo.disableButtons || todo.edit ? "todoButtonDisabled" : "doneTodoButton"}
                onClick={completedHandler}
                disabled={todo.disableButtons || todo.edit}>
                <b>V</b>
            </button> */}


            {
                todo.disableButtons || todo.edit ?
                    <DelTodoButton buttonDisabled
                        onClick={deleteHandler}
                        disabled={todo.disableButtons || todo.edit}>
                        <b>X</b>
                    </DelTodoButton> :
                    <DelTodoButton
                        onClick={deleteHandler}
                        disabled={todo.disableButtons || todo.edit}>
                        <b>X</b>
                    </DelTodoButton>
            }
            {/* <button className={todo.disableButtons || todo.edit ? "todoButtonDisabled" : "delTodoButton"}
                onClick={deleteHandler}
                disabled={todo.disableButtons || todo.edit}>
                <b>X</b>
            </button> */}

            {
                todo.disableButtons ?
                    <EditTodoButton buttonDisabled
                        onClick={handleEditClick}
                        disabled={todo.disableButtons}>
                        <b>{todo.edit ? 'save' : 'edit'}</b>
                    </EditTodoButton> :
                    <EditTodoButton
                        onClick={handleEditClick}
                        disabled={todo.disableButtons}>
                        <b>{todo.edit ? 'save' : 'edit'}</b>
                    </EditTodoButton>
            }
            {/* <button className={todo.disableButtons ? "editTodoButtonDisabled" : "editTodoButton"}
                onClick={handleEditClick}
                disabled={todo.disableButtons}>
                <b>{todo.edit ? 'save' : 'edit'}</b>
            </button> */}
            {/* <EditTodoButton
                {todo.disableButtons ? 'buttonDisabled' : 'buttonEnabled'}
                // color={todo.disableButtons ? "red" : "green"}
                // background={todo.disableButtons ? "red" : "green"}
            >
                <b>edit</b>
            </EditTodoButton> */}

        </TodoLine>
    )
}

export default Todo;
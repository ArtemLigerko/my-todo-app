import React from "react";
// import styled, { css } from "styled-components";
// import { useDispatch } from "react-redux";
import { useActions } from "../hooks/useActions";
import { ITodo } from './types/ITodo';
import { Icounter } from "./types/Icounter";
import { 
    TodoLine,
    UpDownTodoButtonsWrapper,
    UpTodoButton,
    DownTodoButton,
    TodoEditInput,
    TodoTextArea,
    DoneTodoButton,
    DelTodoButton,
    EditTodoButton,
} from './styles/Todo';
 

interface ITodoProps {
    text: string,
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>,  
    todos: ITodo[], 
    setEditText: React.Dispatch<React.SetStateAction<string>>,
    todo: ITodo,
    setDisableInputButton: React.Dispatch<React.SetStateAction<boolean>>,
    disableInputButton: boolean,
    editText: string,
    setCounter: React.Dispatch<React.SetStateAction<Icounter>>,
    counter: Icounter,
    setTodoIndexOf: React.Dispatch<React.SetStateAction<number>>,
    todoIndexOf: number,
}

const Todo: React.FC<ITodoProps> = ({
    text,
    setTodos,
    todos,
    setEditText,
    todo,
    setDisableInputButton,
    disableInputButton,
    editText,
    setCounter,
    counter,
    setTodoIndexOf,
    todoIndexOf,
}) => {


    const { addDeleteCountAction } = useActions();
    const { addUpdateCountAction } = useActions();

    const deleteHandler = ():void => {
        setTodos(todos.filter((el) => el.id !== todo.id));

        addDeleteCountAction(1);  //Redux

        setCounter({
            counterCreated: counter.counterCreated,
            counterUpdated: counter.counterUpdated,
            counterDeleted: counter.counterDeleted + 1,
        })

    }

    const completedHandler = (): void => {
        // Redux

        setTodos(todos.map((item) => {
            if (item.id === todo.id) {
                return {
                    ...item, completed: !item.completed,
                };
            }
            return item;
        }));
    }

    const handleEditClick = (): void => {
        setEditText(todo.text);
        setTodos(todos.map(item => {
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

        addUpdateCountAction(editText !== todo.text && todo.edit ? 1 : 0);  //Redux

        setCounter({
            counterCreated: counter.counterCreated,
            counterUpdated: editText !== todo.text && todo.edit ? counter.counterUpdated + 1 : counter.counterUpdated,
            counterDeleted: counter.counterDeleted,
        });

    }

    const inputEditTextHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEditText(e.target.value);
    }

    const handleTodoMoveUp = ():void => {
        if (todos.indexOf(todo) > 0) {
            const todoUp = todos.slice();
            todoUp.splice(
                (todoUp.indexOf(todo) - 1), 2,
                todoUp[todoUp.indexOf(todo)],
                todoUp[todoUp.indexOf(todo) - 1]);
            setTodos(todoUp);
        }
    }

    const handleTodoMoveDown = ():void => {
        if (todos.indexOf(todo) < todos.length - 1) {
            const todoDown = todos.slice();
            todoDown.splice(
                (todos.indexOf(todo)), 2,
                todos[todos.indexOf(todo) + 1],
                todos[todos.indexOf(todo)]);
            setTodos(todoDown);
        }
    }

    //Drag'n'Drop
    const dragStartHandler = (e, todo) => {
        setTodoIndexOf(todos.indexOf(todo));
        console.log('Drag', todos.indexOf(todo));
    }

    // const dragLeaveHandler = (e) => {
    //     // console.log('DragLeave');
    // }

    const dragOverHandler = (e) => {
        e.preventDefault();
    }

    const dropHandler = (e, todo) => {
        e.preventDefault();
        // console.log('Drop', todos.indexOf(todo));
        const todoDrop = todos.slice();
        todoDrop.splice(todoIndexOf, 1);
        todoDrop.splice(todos.indexOf(todo), 0, todos[todoIndexOf]);
        setTodos(todoDrop);
    }

    // const dragEndHandler = (e) => {
    //     e.target.style.background = 'white';
    //     console.log('DragEnd');
    // }


    return (
        <TodoLine
            draggable={true}
            onDragStart={(e) => dragStartHandler(e, todo)}
            // onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, todo)}
            // onDragEnd={(e) => dragEndHandler(e)}
        >
            {/* <UpDownTodoButtonsWrapper>
                <UpTodoButton onClick={handleTodoMoveUp}>
                    <b>v</b>
                </UpTodoButton>
                <DownTodoButton onClick={handleTodoMoveDown}>
                    <b>v</b>
                </DownTodoButton>
            </UpDownTodoButtonsWrapper> */}


            <DoneTodoButton
                onClick={completedHandler}
                disabled={todo.disableButtons || todo.edit}
                disabledTheme={todo.disableButtons || todo.edit}>
                <b>V</b>
            </DoneTodoButton>

            {
                todo.edit ?
                    <TodoEditInput
                        type="text"
                        defaultValue={text}
                        onChange={inputEditTextHandler}
                    /> :
                    <TodoTextArea
                        completed={todo.completed}
                        randColor={todo.colorId}
                        // onDoubleClick={handleEditClick}    // необходима доработка
                    >
                        {text}
                    </TodoTextArea>
            }

            {/* <DoneTodoButton //Redux
                onClick={completedHandler}
                disabled={todo.disableButtons || todo.edit}
                disabledTheme={todo.disableButtons || todo.edit}>
                <b>V</b>
            </DoneTodoButton> */}

            <DelTodoButton
                onClick={deleteHandler}
                disabled={todo.disableButtons || todo.edit}
                disabledTheme={todo.disableButtons || todo.edit}>
                <b>X</b>
            </DelTodoButton>

            <EditTodoButton
                onClick={handleEditClick}
                disabled={todo.disableButtons}
                disabledTheme={todo.disableButtons}>
                <b>{todo.edit ? 'save' : 'edit'}</b>
            </EditTodoButton>

        </TodoLine>
    )
}

export default Todo;
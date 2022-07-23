import React from "react";
import styled, { css } from "styled-components";
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
} from './styles/Todo'
 

interface ITodoProps {
    text: string,
    setTodos: React.Dispatch<React.SetStateAction<ITodo[] | any>>,  // --!!!--
    todos: ITodo[] | any,                                           // --!!!--
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
            setTodos(todos.slice(
                todos.splice(
                    (todos.indexOf(todo) - 1), 2,
                    todos[todos.indexOf(todo)],
                    todos[todos.indexOf(todo) - 1]
                )
            ));
        }
    }

    const handleTodoMoveDown = ():void => {
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

    //Drag'n'Drop
    const dragStartHandler = (e, todo) => {
        // e.preventDefault();
        setTodoIndexOf(todos.indexOf(todo));
        console.log('DragStart, ', todoIndexOf);

    }
    const dragLeaveHandler = (e) => {
        // console.log('DragLeave');
    }
    const dragOverHandler = (e) => {
        e.preventDefault();
        // e.target.style.background = 'lightgray';
        // console.log('DragOver');
    }
    const dropHandler = (e, todo) => {
        e.preventDefault();
        console.log('Drop', todos.indexOf(todo));

        // setTodos(todos.map(item => {
        //     if (item.id === todo.id) {

        //     }
        // }))
        // function swap(arr, a, b) {
        //     arr[a] = arr.splice(b, 1, arr[a])[0];
        //   }

        // setTodos(            swap(todos, 1, 2).slice()
        // );

        // setTodos(todos.slice(
        //     todos.splice(
        //         (todos.indexOf(todo)), 1,
        //         todos[todoIndexOf]
        //     )
        // ));
        // setTodos(todos.slice(
        //     todos.splice(
        //         (todoIndexOf), 1,
        //         todos[todos.indexOf(todo)]
        //     )
        // ));

    }
    // const dragEndHandler = (e) => {
    //     e.target.style.background = 'white';
    //     console.log('DragEnd');
    // }


    return (
        <TodoLine
            draggable={true}
            // onDragStart={(e) => dragStartHandler(e, todo)}
            // onDragLeave={(e) => dragLeaveHandler(e)}
            // onDragOver={(e) => dragOverHandler(e)}
            // onDrop={(e) => dropHandler(e, todo)}
            // onDragEnd={(e) => dragEndHandler(e)}
        >
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
                    <TodoTextArea
                        completed={todo.completed}
                        randColor={todo.colorId}
                    >
                        {text}
                    </TodoTextArea>
            }
            <DoneTodoButton
                onClick={completedHandler}
                disabled={todo.disableButtons || todo.edit}
                disabledTheme={todo.disableButtons || todo.edit}>
                <b>V</b>
            </DoneTodoButton>

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
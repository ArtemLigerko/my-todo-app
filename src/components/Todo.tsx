import React from "react";
import styled, { css } from "styled-components";
// import { useDispatch } from "react-redux";
import { useActions } from "../hooks/useActions";
import { ITodo } from './types/ITodo';
import { Icounter } from "./types/Icounter";
 
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
    padding: 0.3rem;
    margin: 0 5px;
    width: 400px;
    list-style-type: none;
    text-align: left;
    font-size: 1.2rem;
    border-radius: 5px;
    text-decoration-line: ${props => props.completed ? 'line-through' : 'none'};
    text-decoration-thickness: ${props => props.completed ? '2px' : 'none'};
    ${'' /* color: ${props => props.completed ? 'rgb(180, 180, 180)' : 'black'}; */}
    ${'' /* background-color: ${props => props.completed ? 'rgb(180, 255, 212)' : 'white'}; */}
    background-color: ${props => {
        switch (props.randColor) {
            case 0: return "#FFE4C4";
            case 1: return "#FFDEAD";
            case 2: return "#DEB887";
            case 3: return "#BC8F8F"; //font-white
            case 4: return "#DAA520";
            case 5: return "#B8860B";
            case 6: return "#D2691E";
            case 7: return "#8B4513";
            case 8: return "#A0522D";
            case 9: return "#A52A2A";
            default: return "white";
        }
    }};
    color: ${props => {
        switch (props.randColor) {
            case 0: return "black";
            case 1: return "black";
            case 2: return "black";
            case 3: return "white"; //font-white
            case 4: return "white";
            case 5: return "white";
            case 6: return "white";
            case 7: return "white";
            case 8: return "white";
            case 9: return "white";
            default: return "black";
        }
    }};

`
const TodoButtons = styled.button`
    font-size: 1rem;
    width: 2.2rem;
    height: 2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 2px;
`
const DoneTodoButton = styled(TodoButtons)`
    color: ${props => props.disabledTheme ? 'rgb(180, 180, 180)' : 'rgb(120, 120, 120)'};
    background-color: ${props => props.disabledTheme ? 'rgb(230, 230, 230)' : 'rgb(100, 255, 212)'};
    
`
const DelTodoButton = styled(TodoButtons)`
    color: ${props => props.disabledTheme ? 'rgb(180, 180, 180)' : 'rgb(120, 120, 120)'};
    background-color: ${props => props.disabledTheme ? 'rgb(230, 230, 230)' : 'rgb(255, 144, 100)'};

`
const EditTodoButton = styled(TodoButtons)`
    width: 3rem;
    color: ${props => props.disabledTheme ? 'rgb(180, 180, 180)' : 'rgb(120, 120, 120)'};
    background-color: ${props => props.disabledTheme ? 'rgb(230, 230, 230)' : 'rgb(255, 175, 25)'};
`

const TodoEditInput = styled.input`
    padding: 0.3rem;
    margin: 0 5px;
    width: 400px;
    height: 32px;
    font-size: 1.2rem;
    border-style: dotted;
    border-width: 1.8px;
    border-radius: 5px;
    &:focus {
        outline: none;
    }
`

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

const Todo: React.FC = ({
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
}: ITodoProps) => {


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

    const completedHandler = () => {
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

        addUpdateCountAction(editText !== todo.text && todo.edit ? 1 : 0);  //Redux

        setCounter({
            counterCreated: counter.counterCreated,
            counterUpdated: editText !== todo.text && todo.edit ? counter.counterUpdated + 1 : counter.counterUpdated,
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
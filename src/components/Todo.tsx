//React:
import React, { useState } from "react";
//Styles:
import {
    TodoLine,
    TodoEditInput,
    TodoTextArea,
    DoneTodoButton,
    DelTodoButton,
    EditTodoButton,
} from './styles/Todo';
//Types:
import { ITodo } from './types/ITodo';
//Redux:
import { useDispatch, useSelector } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import {
    putTodos,
    doneTodo,
    deleteTodo,
    editTodo,
} from '../store/reducers/todosReducer';

interface ITodoProps {
    // text: string,
    todo: ITodo,
    setDisableInputButton: React.Dispatch<React.SetStateAction<boolean>>,
    disableInputButton: boolean,
    // setTodoIndexOf: React.Dispatch<React.SetStateAction<number>>,
    // todoIndexOf: number,
}

const Todo: React.FC<ITodoProps> = ({
    // text,
    todo,
    setDisableInputButton,
    disableInputButton,
    // setTodoIndexOf,
    // todoIndexOf,
}) => {

    const [editText, setEditText] = useState<string>('');
    const [todoDrag, setTodoDrag] = useState<number>(0);
    const [todoDrop, setTodoDrop] = useState<number>(0);

    const dispatch = useDispatch();
    const { addDeleteCountAction } = useActions();
    const { addUpdateCountAction } = useActions();
    const todos = useTypedSelector(state => state.todosReducer)

    const completedHandler = (): void => {
        dispatch(doneTodo(todo.id));
        console.log(todo.id);
    }

    const deleteHandler = (): void => {
        dispatch(deleteTodo(todo.id));
        addDeleteCountAction(1);
    }

    const handleEditClick = (): void => {
        // setEditText(todo.text);
        // dispatch(editTodo(todo.id, todo.text, todo.edit, editText));        //Redux
        setEditText(todo.text);
        dispatch(editTodo(todo.id, todo.text, todo.edit, editText));        //Redux
        setDisableInputButton(!disableInputButton);
        addUpdateCountAction(editText !== todo.text && todo.edit ? 1 : 0);  //Redux

    }

    const inputEditTextHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEditText(e.target.value);
    }

    //Drag'n'Drop
    const dragStartHandler = (e, todo) => {
        setTodoDrag(todos.indexOf(todo));
        console.log('Drag', todoDrag);
    }

    // const dragLeaveHandler = (e) => {
    //     // console.log('DragLeave');
    // }

    const dragOverHandler = (e) => {
        e.preventDefault();
    }

    const dropHandler = (e, todo) => {
        e.preventDefault();
        setTodoDrop(todos.indexOf(todo));
        console.log('Drop', todoDrop);
        
    }

    const dragEndHandler = (e) => {
        const todosDrop = todos.slice();
        todosDrop.splice(todoDrag, 1);
        todosDrop.splice(todoDrop, 0, todos[todoDrag]);
        dispatch(putTodos(todosDrop));
        // console.log(todosDrop);
    }

    return (
        <TodoLine
            draggable={true}
            onDragStart={(e) => dragStartHandler(e, todo)}
            // onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, todo)}
            onDragEnd={(e) => dragEndHandler(e)}
        >
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
                        defaultValue={todo.text}
                        onChange={inputEditTextHandler}
                    /> :
                    <TodoTextArea
                        completed={todo.completed}
                        randColor={todo.colorId}
                    // onDoubleClick={handleEditClick}    // необходима доработка
                    >
                        {todo.text}
                    </TodoTextArea>
            }

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
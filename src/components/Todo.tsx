//React:
import React, { FormEvent, useState } from "react";
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
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import {
    putTodos,
    doneTodo,
    deleteTodo,
    editTodo,
} from '../store/reducers/todosReducer';

interface ITodoProps {
    todo: ITodo;
    setDisableInputButton: React.Dispatch<React.SetStateAction<boolean>>;
    disableInputButton: boolean;
    setTodoIndexOf: React.Dispatch<React.SetStateAction<number>>;
    todoIndexOf: number;
}

const Todo: React.FC<ITodoProps> = ({
    todo,
    setDisableInputButton,
    disableInputButton,
    setTodoIndexOf,
    todoIndexOf,
}) => {

    const [editText, setEditText] = useState<string>('');

    const dispatch = useTypedDispatch();
    const { addDeleteCountAction } = useActions();
    const { addUpdateCountAction } = useActions();
    const todos = useTypedSelector(state => state.todos)

    const completedHandler = (): void => {
        dispatch(doneTodo(todo.id));
        // console.log(todo.id);
    }

    const deleteHandler = (): void => {
        dispatch(deleteTodo(todo.id));
        addDeleteCountAction(1);
    }

    const handleEditClick = (): void => {
        setEditText(todo.text);
        dispatch(editTodo(todo.id, todo.text, todo.edit, editText));        //Redux
        setDisableInputButton(!disableInputButton);
        addUpdateCountAction(editText !== todo.text && todo.edit ? 1 : 0);  //Redux

    }

    const inputEditTextHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEditText(e.target.value);
    }

    //Drag'n'Drop
    const dragStartHandler = (todo: ITodo): void => {
        // console.log('Drag', todos.indexOf(todo));
        setTodoIndexOf(todos.indexOf(todo));
    }

    // const dragLeaveHandler = (e) => {
    //     // console.log('DragLeave');
    // }

    const dragOverHandler = (e: FormEvent): void => {
        e.preventDefault();
    }

    const dropHandler = (e: FormEvent, todo: ITodo): void => {
        e.preventDefault();
        // console.log('Drop', todos.indexOf(todo));
        const todosDrop = todos.slice();
        todosDrop.splice(todoIndexOf, 1);
        todosDrop.splice(todos.indexOf(todo), 0, todos[todoIndexOf]);
        dispatch(putTodos(todosDrop));
    }

    const dragEndHandler = (): void => {
        // console.log(todosDrop);
    }

    return (
        <TodoLine
            draggable={true}
            onDragStart={() => dragStartHandler(todo)}
            // onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, todo)}
            onDragEnd={() => dragEndHandler()}
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
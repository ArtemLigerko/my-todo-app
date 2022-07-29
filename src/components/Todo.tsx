//React:
import React from "react";
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
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import {
    putTodos,
    doneTodo,
    deleteTodo,
    editTodo, 
} from '../store/reducers/todosReducer';
 
interface ITodoProps {
    text: string,
    setEditText: React.Dispatch<React.SetStateAction<string>>,
    todo: ITodo,
    setDisableInputButton: React.Dispatch<React.SetStateAction<boolean>>,
    disableInputButton: boolean,
    editText: string,
    setTodoIndexOf: React.Dispatch<React.SetStateAction<number>>,
    todoIndexOf: number,
}

const Todo: React.FC<ITodoProps> = ({
    text,
    setEditText,
    todo,
    setDisableInputButton,
    disableInputButton,
    editText,
    setTodoIndexOf,
    todoIndexOf,
}) => {

    const dispatch = useDispatch();

    const { addDeleteCountAction } = useActions();
    const { addUpdateCountAction } = useActions();

    const showTodos = useTypedSelector(state => state.todosReducer)

    const completedHandler = (): void => {
        dispatch( doneTodo(todo.id) );
        console.log(todo.id);
    }

    const deleteHandler = ():void => {
        dispatch( deleteTodo(todo.id) );
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
    const dragStartHandler = (e, todo) => {
        // console.log('Drag', showTodos.indexOf(todo));
        setTodoIndexOf(showTodos.indexOf(todo));
    }

    // const dragLeaveHandler = (e) => {
    //     // console.log('DragLeave');
    // }

    const dragOverHandler = (e) => {
        e.preventDefault();
    }

    const dropHandler = (e, todo) => {
        e.preventDefault();
        // console.log('Drop', showTodos.indexOf(todo));
        const todoDrop = showTodos.slice();
        todoDrop.splice(todoIndexOf, 1);
        todoDrop.splice(showTodos.indexOf(todo), 0, showTodos[todoIndexOf]);
        // setTodos(todoDrop);
        dispatch(putTodos(todoDrop));
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
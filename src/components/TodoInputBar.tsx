//React:
import React, { useState } from "react";
//Components:
import InputModal from './InputModal';
//Styles:
import '../App.scss';
import {
    TodoInputForm,
    InputTodoBar,
    AddTodoButton,
    OptionButtonsWrapper,
    AddTaskButton,
    AddFromServerButton,
    ClearAllButton,
    FilterTodoSelector,
} from './styles/TodoInputBar';
//Types:
import { ITodo, ITodoFetch } from "./types/ITodo";
//Redux:
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { filterTodos } from "../store/reducers/todosFilterReducer";
import {
    addTodo,
    clearTodos,
    fetchTodo,
} from '../store/reducers/todosReducer';



interface TodoInputBarProps {
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    disableInputButton: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    active: boolean;
}

const TodoInputBar: React.FC<TodoInputBarProps> = ({
    setStatus,
    disableInputButton,
    setActive,
    active,
}) => {
    const [inputText, setInputText] = useState<string>('');


    const dispatch = useTypedDispatch();
    const todos = useTypedSelector(state => state.todos);

    const { addCreateCountAction } = useActions();  //Redux
    const { addDeleteCountAction } = useActions();  //Redux

    const inputTextHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputText(e.target.value);
    }

    const submitHandler = (e: React.MouseEvent<HTMLButtonElement> |
        React.KeyboardEvent<HTMLInputElement>): void => {
        e.preventDefault();
        dispatch(addTodo(inputText));
        addCreateCountAction(1);
        setInputText("");
    }

    const handleClearTodos = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        dispatch(clearTodos());
        addDeleteCountAction(todos.length);
    }

    const filterHandler: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        setStatus(e.target.value);
    }

    const handleFetchTodos = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let url = 'https://gist.githubusercontent.com/alexandrtovmach/0c8a29b734075864727228c559fe9f96/raw/c4e4133c9658af4c4b3474475273b23b4a70b4af/todo-task.json'
        await fetch(url)
            .then(response => response.json())
            .then(getTodos => {
                const todos: ITodo[] = getTodos.map((item: ITodoFetch) => {
                    return {
                        id: Math.random() * 1000,
                        text: item.text,
                        completed: item.isCompleted,
                        edit: false,
                        disableButtons: false,
                        colorId: Math.floor(Math.random() * 10),
                    }
                })
                addCreateCountAction(getTodos.length);  //Redux
                dispatch(fetchTodo(todos));
            });
    }

    return (
        <TodoInputForm>
            <InputModal
                active={active}
                setActive={setActive}
            >
                <div>
                    <InputTodoBar
                        value={inputText}
                        onChange={inputTextHandler}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') { submitHandler(e); }
                        }}
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
            </InputModal>


            <OptionButtonsWrapper>
                <AddTaskButton
                    onClick={() => setActive(true)}
                    type="submit"
                    disabled={disableInputButton}
                >
                    +
                </AddTaskButton>
                <AddFromServerButton onClick={handleFetchTodos}>
                    add from server
                </AddFromServerButton>
                <ClearAllButton onClick={handleClearTodos}>
                    clear all
                </ClearAllButton>
                <FilterTodoSelector onChange={filterHandler}>
                    <option>All</option>
                    <option>Completed</option>
                    <option>Uncompleted</option>
                </FilterTodoSelector>

            </OptionButtonsWrapper>
        </TodoInputForm>
    )
}

export default TodoInputBar;
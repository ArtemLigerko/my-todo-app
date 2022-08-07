//React:
import React, { useState } from "react";
//Components:
import InputModal from './InputModal';
//Styles:
import '../app/App.scss';
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
// import { useActions } from "../hooks/useActions";
// import { filterTodos } from "../store/reducers/todosFilterReducer";
import {
    createCount,
    updateCount,
    deleteCount
} from '../store/reducers/statisticSlice';
// import {
//     addTodo,
//     clearTodos,
//     fetchTodo,
// } from '../store/reducers/todosReducer';
import {
    addTodo,
    clearTodos,
    fetchTodo
} from '../store/reducers/todosSlice';
import { todosFilter } from '../store/reducers/todosFilterSlice';



interface TodoInputBarProps {
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    disableInputButton: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    active: boolean;
}

const TodoInputBar: React.FC<TodoInputBarProps> = ({
    setFilter,
    disableInputButton,
    setActive,
    active,
}) => {
    const [inputText, setInputText] = useState<string>('');

    const dispatch = useTypedDispatch();
    const todos = useTypedSelector(state => state.todos);

    const inputTextHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputText(e.target.value);
    }

    const submitHandler = (e: React.MouseEvent<HTMLButtonElement> |
        React.KeyboardEvent<HTMLInputElement>): void => {
        e.preventDefault();
        dispatch(addTodo(inputText));
        dispatch(createCount(1));
        setInputText("");
    }

    const handleClearTodos = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        dispatch(clearTodos());
        dispatch(deleteCount(todos.length));
    }

    const filterHandler: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        setFilter(e.target.value);
        // dispatch(todosFilter({todos: todos, filter: e.target.value}));
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
                dispatch(createCount(getTodos.length));  //Redux
                dispatch(fetchTodo(todos));
            });
    }

    return (
        <TodoInputForm>
            <InputModal
                active={active}
                setActive={setActive}
            >
            </InputModal>
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
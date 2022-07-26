import React from "react";
import styled from 'styled-components';
import '../App.scss';
// import { useDispatch } from "react-redux/es/exports";
// import { addCreateCountAction } from "../store/action-creators/statistic";
import { useActions } from "../hooks/useActions";
import { ITodo } from "./types/ITodo";
import { Icounter } from "./types/Icounter";
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
import InputModal from './InputModal';


interface TodoInputBarProps {
    setInputText: React.Dispatch<React.SetStateAction<string>>,
    inputText: string,
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>,
    todos: ITodo[],
    setStatus: React.Dispatch<React.SetStateAction<string>>,
    disableInputButton: boolean,
    setCounter: React.Dispatch<React.SetStateAction<Icounter>>,
    counter: Icounter,
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
    active: boolean,
}

const TodoInputBar: React.FC<TodoInputBarProps> = ({
    setInputText,
    inputText,
    setTodos,
    todos,
    setStatus,
    disableInputButton,
    setCounter,
    counter,
    setActive,
    active,
}) => {

    const { addCreateCountAction } = useActions();  //Redux
    const { addDeleteCountAction } = useActions();  //Redux

    const inputTextHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputText(e.target.value);
    }

    const submitHandler = (e: React.MouseEvent<HTMLButtonElement> |
        React.KeyboardEvent<HTMLInputElement>): void => {
        e.preventDefault();

        addCreateCountAction(1);  //Redux
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
                // index: 1,
            }
        ]);
        setInputText("");
    }

    const handleClearTodos = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();

        addDeleteCountAction(todos.length);  //Redux

        setCounter({
            counterCreated: counter.counterCreated,
            counterUpdated: counter.counterUpdated,
            counterDeleted: counter.counterDeleted + todos.length,
        });
        setTodos([]);
    }

    const statusHandler: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        setStatus(e.target.value);
    }

    const handleFetchTodos = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let url = 'https://gist.githubusercontent.com/alexandrtovmach/0c8a29b734075864727228c559fe9f96/raw/c4e4133c9658af4c4b3474475273b23b4a70b4af/todo-task.json'
        await fetch(url)
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
                            // index: todos.indexOf(item),
                        }
                    })
                ]);

                addCreateCountAction(getTodos.length);  //Redux

                setCounter({
                    counterCreated: counter.counterCreated + getTodos.length,
                    counterUpdated: counter.counterUpdated,
                    counterDeleted: counter.counterDeleted,
                });
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
                    add task (modal)
                </AddTaskButton>
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
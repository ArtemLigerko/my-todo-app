//React:
import React, { useState, useEffect } from 'react';
//Components:
import TodoInputBar from './components/TodoInputBar';
import TodoList from './components/TodoList';
import Statistic from './components/Statistic';
//Styles:
import styled from 'styled-components';
import './App.scss';
//Hooks:
import { useActions } from './hooks/useActions';
//Types:
import { ITodo } from './components/types/ITodo';
//Redux:
import { useTypedDispatch } from "./hooks/useTypedDispatch";
import { useTypedSelector } from './hooks/useTypedSelector';
import { getLocalStorageTodos } from './store/reducers/todosReducer';

//Style:
const Head = styled.h1`
  color: #A52A2A;
  // color: rgb(255, 255, 255);
  font-size: 3rem;
  margin: 30px 0px 30px;
  box-sizing: border-box;
  text-align: center;
`
// const AppWrapper = styled.div`
//   font-family: Arial, Helvetica, sans-serif;
//   background-color: rgb(252, 218, 155);
//   width: 100%;
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `


const App: React.FC = () => {
  const [status, setStatus] = useState<string>("All");
  const [completedTodos, setCompletedTodos] = useState<ITodo[]>([]);
  const [disableInputButton, setDisableInputButton] = useState<boolean>(false);
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [todoIndexOf, setTodoIndexOf] = useState<number>(0);

  const dispatch = useTypedDispatch();
  const todos = useTypedSelector(state => state.todos);

  const { addCreateCountAction } = useActions(); //Redux
  const { addUpdateCountAction } = useActions(); //Redux
  const { addDeleteCountAction } = useActions(); //Redux

  //RUN ONCE when the app starts
  useEffect((): void => {
    getLocalTodos();
  }, []);

  // Use Effect
  useEffect((): void => {
    filterHandler();
    saveLocalTodos();
  }, [status, todos]);


  const filterHandler = (): void => {
    switch (status) {
      case "Completed":
        setCompletedTodos(todos.filter((item: ITodo) => item.completed === true));
        break;
      case "Uncompleted":
        setCompletedTodos(todos.filter((item: ITodo) => item.completed === false));
        break;
      default:
        setCompletedTodos(todos);
        break;
    }
  }

  // Save to local
  const statisticState = useTypedSelector(state => state.statistic);  //Redux

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("counter", JSON.stringify(statisticState)); //Redux
  };


  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      dispatch(getLocalStorageTodos(todoLocal));
    }

    //Redux
    if (localStorage.getItem("counter") === null) {
      localStorage.setItem("counter", JSON.stringify({}));
    } else {
      let counterLocalRedux = JSON.parse(localStorage.getItem("counter"));
      addCreateCountAction(counterLocalRedux.counterCreated);
      addUpdateCountAction(counterLocalRedux.counterUpdated);
      addDeleteCountAction(counterLocalRedux.counterDeleted);
    }
  };

  return (
    // <AppWrapper>
    <div className='appWrapper'>
      <header className='header'>
        <Statistic />
        <Head>
          Artem's Todo App
        </Head>
      </header>
      <TodoInputBar
        setStatus={setStatus}
        disableInputButton={disableInputButton}
        setActive={setModalActive}
        active={modalActive}
      />
      <TodoList
        completedTodos={completedTodos}
        setDisableInputButton={setDisableInputButton}
        disableInputButton={disableInputButton}
        todoIndexOf={todoIndexOf}
        setTodoIndexOf={setTodoIndexOf}
      />

    </div>
    // </AppWrapper>
  );
}

export default App;

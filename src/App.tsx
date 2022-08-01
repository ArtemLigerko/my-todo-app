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
// import { ITodo } from './components/types/ITodo';
//Redux:
import { useTypedDispatch } from "./hooks/useTypedDispatch";
import { useTypedSelector } from './hooks/useTypedSelector';
import { getLocalStorageTodos } from './store/reducers/todosReducer';
import { filterTodos } from './store/reducers/todosFilterReducer';

//Style:
const Head = styled.h1`
  color: #A52A2A;
  // color: rgb(255, 255, 255);
  font-size: 3rem;
  margin: 30px 0px 30px;
  box-sizing: border-box;
  text-align: center;
`

const App: React.FC = () => {
  const [filter, setFilter] = useState<string>("All");
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
  }, [filter, todos]);


  const filterHandler = (): void => {
    dispatch( filterTodos(todos, filter) );
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
    <div className='appWrapper'>
      <header className='header'>
        <Statistic />
        <Head>
          Artem's Todo App
        </Head>
      </header>
      <TodoInputBar
        setFilter={setFilter}
        disableInputButton={disableInputButton}
        setActive={setModalActive}
        active={modalActive}
      />
      <TodoList
        setDisableInputButton={setDisableInputButton}
        disableInputButton={disableInputButton}
        todoIndexOf={todoIndexOf}
        setTodoIndexOf={setTodoIndexOf}
      />
    </div>
  );
}

export default App;

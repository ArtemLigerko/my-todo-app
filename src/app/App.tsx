//React:
import React, { useState, useEffect } from 'react';
//Components:
import TodoInputBar from '../components/TodoInputBar';
import TodoList from '../components/TodoList';
import Statistic from '../components/Statistic';
import SearchBar from '../components/SearchBar'
//Styles:
import './App.scss';
import { Head } from './App.styles'
//Redux:
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { useTypedSelector } from '../hooks/useTypedSelector';
import { todosFilter } from '../store/reducers/todosFilterSlice';


const App: React.FC = () => {
  const [filter, setFilter] = useState<string>("All");
  const [disableInputButton, setDisableInputButton] = useState<boolean>(false);
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [todoIndexOf, setTodoIndexOf] = useState<number>(0);

  const dispatch = useTypedDispatch();
  const todos = useTypedSelector(state => state.todos);

  //UseEffect
  useEffect((): void => {
    filterHandler();
  }, [filter, todos]);


  const filterHandler = (): void => {
    dispatch(todosFilter({todos: todos, filter: filter}));
  }


  return (
    <div className='appWrapper'>
      <Statistic />
      {/* <SearchBar /> */}
      <header className='header'>
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

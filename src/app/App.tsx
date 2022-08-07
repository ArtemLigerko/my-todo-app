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
// import { useSelector, useDispatch } from 'react-redux'; //ReduxSlice
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { useTypedSelector } from '../hooks/useTypedSelector';
import { createCount, updateCount, deleteCount } from '../store/reducers/statisticSlice';
import { putTodos } from '../store/reducers/todosReducer';
import { todosFilter } from '../store/reducers/todosFilterReducer';
// import { todosFilter } from '../store/reducers/todosFilterSlice';


const App: React.FC = () => {
  const [filter, setFilter] = useState<string>("All");
  const [disableInputButton, setDisableInputButton] = useState<boolean>(false);
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [todoIndexOf, setTodoIndexOf] = useState<number>(0);

  const dispatch = useTypedDispatch();
  const todos = useTypedSelector(state => state.todos);

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
    // dispatch(todosFilter(todos, filter)); //Redux-Core
    dispatch(todosFilter(todos, filter)); //Slice
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
      dispatch(putTodos(todoLocal));
    }

    //Redux
    if (localStorage.getItem("counter") === null) {
      localStorage.setItem("counter", JSON.stringify({}));
    } else {
      let counterLocalRedux = JSON.parse(localStorage.getItem("counter"));
      dispatch(createCount(counterLocalRedux.counterCreated));
      dispatch(updateCount(counterLocalRedux.counterUpdated));
      dispatch(deleteCount(counterLocalRedux.counterDeleted));
    }
  };

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

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.scss';
import TodoInputBar from './components/TodoInputBar';
import TodoList from './components/TodoList';
import Statistic from './components/Statistic';
import InputModal from './components/InputModal';
// import { useSelector, useDispatch } from 'react-redux';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useActions } from './hooks/useActions';
import { ITodo } from './components/types/ITodo';
import { Icounter } from "./components/types/Icounter";


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
  const [inputText, setInputText] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [status, setStatus] = useState<string>("All");
  const [completedTodos, setCompletedTodos] = useState<ITodo[]>([]);
  const [editText, setEditText] = useState<string>('');
  const [disableInputButton, setDisableInputButton] = useState<boolean>(false);
  const [counter, setCounter] = useState<Icounter>({
    counterCreated: 0,
    counterUpdated: 0,
    counterDeleted: 0,
  });
  const [todoIndexOf, setTodoIndexOf] = useState<number>(0);
  const [modalActive, setModalActive] = useState<boolean>(false);
  // const [show, setShow] = useState<boolean>(false);        //Bootstrap



  //RUN ONCE when the app starts
  useEffect((): void => {
    getLocalTodos();
  }, []);

  // Use Effect
  useEffect((): void => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);


  const filterHandler = (): void => {
    switch (status) {
      case "Completed":
        setCompletedTodos(todos.filter(item => item.completed === true));
        break;
      case "Uncompleted":
        setCompletedTodos(todos.filter(item => item.completed === false));
        break;
      default:
        setCompletedTodos(todos);
        break;
    }
  }

  // Save to local
  // 01:23:00
  const statisticState = useTypedSelector(state => state.statistic);  //Redux

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("counter", JSON.stringify(counter));
    localStorage.setItem("counter (redux)", JSON.stringify(statisticState)); //Redux
  };

  const { addCreateCountAction } = useActions(); //Redux
  const { addUpdateCountAction } = useActions(); //Redux
  const { addDeleteCountAction } = useActions(); //Redux

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }

    if (localStorage.getItem("counter") === null) {
      localStorage.setItem("counter", JSON.stringify({}));
    } else {
      let counterLocal = JSON.parse(localStorage.getItem("counter"));
      setCounter(counterLocal);
    }

    //Redux
    if (localStorage.getItem("counter (redux)") === null) {
      localStorage.setItem("counter (redux)", JSON.stringify({}));
    } else {
      let counterLocalRedux = JSON.parse(localStorage.getItem("counter (redux)"));
      addCreateCountAction(counterLocalRedux.counterCreated);
      addUpdateCountAction(counterLocalRedux.counterUpdated);
      addDeleteCountAction(counterLocalRedux.counterDeleted);
    }
  };

  return (
    // <AppWrapper>
    <div className='appWrapper'>
      <header className='header'>
        <Statistic
          counter={counter}
        />
        <Head>
          Artem's Todo App
        </Head>
      </header>
      <TodoInputBar
        inputText={inputText}
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
        setStatus={setStatus}
        disableInputButton={disableInputButton}
        setCounter={setCounter}
        counter={counter}
        setActive={setModalActive}
        active={modalActive}
        // show={show}            //Bootstrap
        // setShow={setShow}      //Bootstrap
      />
      {/* <InputModal
        active={modalActive}
        setActive={setModalActive}
      /> */}
      <TodoList
        todos={todos}
        setTodos={setTodos}
        completedTodos={completedTodos}
        setEditText={setEditText}
        editText={editText}
        setDisableInputButton={setDisableInputButton}
        disableInputButton={disableInputButton}
        setCounter={setCounter}
        counter={counter}
        todoIndexOf={todoIndexOf}
        setTodoIndexOf={setTodoIndexOf}
      />

    </div>
    // </AppWrapper>
  );
}

export default App;

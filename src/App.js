import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import './scss/Styles.scss';
// import components
import TodoInputBar from './components/TodoInputBar';
import TodoList from './components/TodoList';
import Statistic from './components/Statistic';

//Style:
const Head = styled.h1`
  color: rgb(255, 255, 255);
  font-size: 3rem;
  margin: 30px 0px 30px;
`
const AppWrapper = styled.div`
  width: 100%;
  min-height: 98vh;
  font-family: Arial, Helvetica, sans-serif;
  background-color: rgb(252, 218, 155);
  display: flex;
  flex-direction: column;
  align-items: center;
`


function App() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("All");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [editText, setEditText] = useState('');
  const [disableInputButton, setDisableInputButton] = useState(false);
  const [counter, setCounter] = useState({
    counterCreated: 0,
    counterUpdated: 0,
    counterDeleted: 0,
  })


  //RUN ONCE when the app starts
  useEffect(() => {
    getLocalTodos();
  }, []);

  // Use Effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);


  const filterHandler = () => {
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
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("counter", JSON.stringify(counter));
  };

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
  };


  return (
    <AppWrapper>
      <header>
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
      />
      <Statistic
        counter={counter}
        setCounter={setCounter}
      />
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
      />
      <div className="end">
        The End!
      </div>
    </AppWrapper>
  );
}

export default App;

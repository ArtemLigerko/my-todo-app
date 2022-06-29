import React, { useState, useEffect } from 'react';
import './App.css';
// import components
import TodoInputBar from './components/TodoInputBar';
import TodoList from './components/TodoList';
import Statistic from './components/Statistic';


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
    <div className="App">
      <header>
        <h1 className="head">
          Artem's Todo App
        </h1>
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
    </div>
  );
}

export default App;

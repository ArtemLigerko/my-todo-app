import React, { useState, useEffect } from 'react';
import './App.css';
// import components
import TodoInputBar from './components/TodoInputBar';
import TodoList from './components/TodoList';


function App() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("All");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [editText, setEditText] = useState('');
  const [disableInputButton, setDisableInputButton] = useState(false);

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
    console.log("saveLocalTodos Effect");
  };
  
  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
      console.log('getLocalTodos Effect');
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
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        completedTodos={completedTodos}
        setEditText={setEditText}
        editText={editText}
        setDisableInputButton={setDisableInputButton}
        disableInputButton={disableInputButton}
      />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
// import components
import TodoInputBar from './components/TodoInputBar';
import TodoList from './components/TodoList';


function App() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("Completed");
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    console.log("Hey");
    filterHandler();
  }, [todos, status])
  
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


  return (
    <div className="App">
      <header>
        <h1 className="head">
          My Todo App
        </h1>
      </header>
      <TodoInputBar
        inputText={inputText}
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
        setStatus={setStatus}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        completedTodos={completedTodos} />
    </div>
  );
}

export default App;

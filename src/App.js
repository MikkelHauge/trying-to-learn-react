import React, { useState, useRef, useEffect } from 'react'
import './App.css';
import TodoList from './TodoList';
import { v4 as uuid } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() { // todo objects: [{ id: 1, name: "Cook food", complete: false}]
  const [todos, setTodos] = useState(() => {
    // Loads any todos, if they exist
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
  });
  const todoNameRef = useRef()



  useEffect(() => { // save todo
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e){
    const todoName = todoNameRef.current.value
    if (todoName === '') return

    setTodos(prevTodos => {
      return [...prevTodos, { id: uuid(), name: todoName, complete: false}]
    })

    todoNameRef.current.value = null;
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" />
        <button onClick={handleAddTodo}>Add Todo</button>
        <button>Clear completed todos</button>
        <div>0 left to do</div>
    </>
  );
}

export default App;

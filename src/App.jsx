import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, toggleTodo } from './redux/todoSlice';
import './App.css';

function App() {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;
    dispatch(
      addTodo({
        id: Date.now(),
        text: newTodo,
        completed: false,
      })
    );
    setNewTodo('');
  };

  const formattedDate = currentTime.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  const formattedTime = currentTime.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="app">
      <div className="header">
        <span className="date">{formattedDate}</span>
        <span className="time">{formattedTime}</span>
      </div>
      <div className="todo-container">
        <input
          type="text"
          className="todo-input"
          placeholder="할 일을 입력하세요"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="add-button" onClick={handleAddTodo}>
          +
        </button>
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
              />
              <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
              <button
                className="delete-button"
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

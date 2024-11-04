import React, { useContext } from 'react';
import './Form.css';
import { TodosContext } from '../context/TodosContext';

const Form = () => {
  const { text, setText, addTodo } = useContext(TodosContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };

  return (
    <form onSubmit={handleSubmit} className="todo_form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="todo_input"
      />
      <button type="submit" className="todo_button">할 일 등록</button>
    </form>
  );
};

export default Form;

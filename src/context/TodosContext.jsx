import React, { createContext, useState } from 'react';

export const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([
    { id: 1, task: '니가행복하길바랬는데정작니가행복해지니깐' },
    { id: 2, task: '내기분이참이상해지더라' },
  ]);
  const [text, setText] = useState('');
  const [editingID, setEditingID] = useState('');
  const [editText, setEditText] = useState('');

  const addTodo = () => {
    if (text.trim().length === 0) return;
    setTodos((prev) => [...prev, { id: Math.floor(Math.random() * 100) + 2, task: text }]);
    setText('');
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const updateTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task: text } : item))
    );
    setEditingID('');
    setEditText('');
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        text,
        setText,
        editingID,
        setEditingID,
        editText,
        setEditText,
        addTodo,
        deleteTodo,
        updateTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
    
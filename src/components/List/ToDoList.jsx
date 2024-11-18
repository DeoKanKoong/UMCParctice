// src/components/List/ToDoList.jsx
import React, { useState } from 'react';
import './ToDoList.css';

function ToDoList({ tasks, deleteTodo, updateTodo, goToDetail }) {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const startEditing = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditContent(task.content);
  };

  const saveEdit = async (id) => {
    try {
      await updateTodo(id, { title: editTitle, content: editContent });
      setEditId(null);
      setEditTitle('');
      setEditContent('');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle('');
    setEditContent('');
  };

  const toggleCompletion = (task) => {
    updateTodo(task.id, { checked: !task.checked });
  };

  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <li key={task.id} className="todo-item">
          {editId === task.id ? (
            <div className="todo-edit-form">
              <input
                className="edit-input"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <input
                className="edit-input"
                type="text"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button className="save-button" onClick={() => saveEdit(task.id)}>
                저장
              </button>
              <button className="cancel-button" onClick={cancelEdit}>
                취소
              </button>
            </div>
          ) : (
            <div className="todo-content">
              <span className="todo-title" onClick={() => goToDetail(task.id)}>
                {task.title}
              </span>
              <p className="todo-description" onClick={() => goToDetail(task.id)}>
                {task.content}
              </p>
              <input
                type="checkbox"
                checked={task.checked}
                onChange={() => toggleCompletion(task)}
              />
              <div className="todo-buttons">
                <button className="todo-edit-button" onClick={() => startEditing(task)}>
                  수정
                </button>
                <button className="todo-delete-button" onClick={() => deleteTodo(task.id)}>
                  삭제
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ToDoList;

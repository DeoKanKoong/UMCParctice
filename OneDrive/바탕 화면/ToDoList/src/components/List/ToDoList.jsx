// src/components/List/ToDoList.jsx
import React, { useState } from 'react';
import './ToDoList.css';

function ToDoList({ tasks, setTasks, fetchData }) {
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
      const updatedTask = await fetchData(`http://localhost:3000/todo/${id}`, 'PATCH', {
        title: editTitle,
        content: editContent,
      });
      if (updatedTask) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, title: editTitle, content: editContent } : task
          )
        );
        cancelEdit();
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const toggleCompletion = async (id, checked) => {
    try {
      const updatedTask = await fetchData(`http://localhost:3000/todo/${id}`, 'PATCH', {
        checked: !checked,
      });
      if (updatedTask) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, checked: !task.checked } : task
          )
        );
      }
    } catch (error) {
      console.error('Error toggling completion:', error);
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle('');
    setEditContent('');
  };

  const deleteTask = async (id) => {
    try {
      await fetchData(`http://localhost:3000/todo/${id}`, 'DELETE');
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
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
              <span className="todo-title" onClick={() => console.log("Detail Clicked!")}>
                {task.title}
              </span>
              <p className="todo-description" onClick={() => console.log("Detail Clicked!")}>
                {task.content}
              </p>
              <input
                type="checkbox"
                checked={task.checked}
                onChange={() => toggleCompletion(task.id, task.checked)}
              />
              <div className="todo-buttons">
                <button className="todo-edit-button" onClick={() => startEditing(task)}>
                  수정
                </button>
                <button className="todo-delete-button" onClick={() => deleteTask(task.id)}>
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

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './ToDoDetail.css';

function ToDoDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const { fetchData, loading, error } = useFetch();

  useEffect(() => {
    const getTaskDetail = async () => {
      try {
        const taskData = await fetchData(`http://localhost:3000/todo/${id}`);
        setTask(taskData);
      } catch (err) {
        console.error('Failed to fetch task details:', err);
      }
    };

    if (id) {
      getTaskDetail();
    }
  }, [id, fetchData]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <div className="todo-detail-container">
      {task ? (
        <div>
          <h2 className="todo-detail-title">{task.title}</h2>
          <p className="todo-detail-content">{task.content}</p>
          <p>작성일: {new Date(task.createdAt).toLocaleDateString()}</p>
          <p>수정일: {new Date(task.updatedAt).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>할 일이 없습니다.</p>
      )}
    </div>
  );
}

export default ToDoDetail;

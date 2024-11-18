import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import useFetch from './hooks/useFetch';
import ToDoInput from './components/Input/ToDoInput';
import ToDoList from './components/List/ToDoList';
import ToDoDetail from './components/Detail/ToDoDetail';
import './App.css';
import debounce from 'lodash/debounce';

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const { fetchData, loading, error } = useFetch();

  const debouncedSearch = useCallback(
    debounce(async (title) => {
      try {
        const tasksData = await fetchData(`http://localhost:3000/todo?title=${title}`);
        if (tasksData && Array.isArray(tasksData)) {
          setTasks(tasksData[0]);
        }
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
      }
    }, 300),
    [fetchData]
  );

  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasksData = await fetchData('http://localhost:3000/todo');
        if (tasksData && Array.isArray(tasksData)) {
          setTasks(tasksData[0]);
        }
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
      }
    };

    getTasks();
  }, [fetchData]);

  useEffect(() => {
    if (searchTitle) {
      debouncedSearch(searchTitle);
    } else {
      fetchData('http://localhost:3000/todo').then((tasksData) => {
        if (tasksData && Array.isArray(tasksData)) {
          setTasks(tasksData[0]);
        }
      });
    }
  }, [searchTitle, debouncedSearch, fetchData]);

  return (
    <div className="app-container">
      <h1 className="app-title">제발 너무 괴로워요</h1>
      <input
        type="text"
        className="search-input"
        placeholder="검색할 제목을 입력하세요"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ToDoInput fetchData={fetchData} setTasks={setTasks} tasks={tasks} />
              {loading ? (
                <p>로딩 중...</p>
              ) : error ? (
                <p>에러 발생: {error.message}</p>
              ) : (
                <ToDoList tasks={tasks} setTasks={setTasks} fetchData={fetchData} />
              )}
            </>
          }
        />
        <Route path="/todo/:id" element={<ToDoDetail />} />
      </Routes>
    </div>
  );
}

export default App;

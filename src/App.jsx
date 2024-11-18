// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import ToDoInput from './components/Input/ToDoInput';
import ToDoList from './components/List/ToDoList';
import ToDoDetail from './components/Detail/ToDoDetail';
import './App.css';

const fetchTodos = async (searchTitle) => {
  const response = searchTitle
    ? await axios.get(`http://localhost:3000/todo?title=${searchTitle}`)
    : await axios.get('http://localhost:3000/todo');
  return response.data[0];
};

function App() {
  const [searchTitle, setSearchTitle] = useState('');
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // useQuery: 객체 형태로 수정
  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['todos', searchTitle],
    queryFn: () => fetchTodos(searchTitle),
  });

  // useMutation: 추가 기능
  const addTodoMutation = useMutation({
    mutationFn: (newTodo) => axios.post('http://localhost:3000/todo', newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // useMutation: 삭제 기능
  const deleteTodoMutation = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:3000/todo/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // useMutation: 수정 기능
  const updateTodoMutation = useMutation({
    mutationFn: ({ id, updates }) => axios.patch(`http://localhost:3000/todo/${id}`, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleSearch = (e) => {
    setSearchTitle(e.target.value);
  };

  const goToDetail = (id) => {
    navigate(`/todo/${id}`);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">할 일 목록</h1>
      <input
        type="text"
        className="search-input"
        placeholder="검색할 제목을 입력하세요"
        value={searchTitle}
        onChange={handleSearch}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ToDoInput
                addTodo={(newTodo) => addTodoMutation.mutate(newTodo)}
                tasks={tasks || []}
              />
              {isLoading ? (
                <p>로딩 중...</p>
              ) : error ? (
                <p>에러 발생: {error.message}</p>
              ) : (
                <ToDoList
                  tasks={tasks || []}
                  deleteTodo={(id) => deleteTodoMutation.mutate(id)}
                  updateTodo={(id, updates) => updateTodoMutation.mutate({ id, updates })}
                  goToDetail={goToDetail}
                />
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

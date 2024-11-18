import React, { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  max-width: 300px;
  padding: 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

function ToDoInput({ fetchData, setTasks, tasks }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const addTask = async () => {
    if (!title || !content) return;
    const newTask = { title, content };
    try {
      const addedTask = await fetchData('http://localhost:3000/todo', 'POST', newTask);
      if (addedTask) {
        setTasks((prevTasks) => [...prevTasks, addedTask]);
        setTitle('');
        setContent('');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <InputContainer>
      <Input
        type="text"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        type="text"
        placeholder="내용을 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button onClick={addTask}>ToDo 생성</Button>
    </InputContainer>
  );
}

export default ToDoInput;

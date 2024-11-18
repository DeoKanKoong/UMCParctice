import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

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
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #28a745;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${spin} 1s linear infinite;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: -10px;
`;

function ToDoInput({ addTodo, setTasks }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTask = async () => {
    if (!title || !content) return;
    const newTask = { title, content };
    setLoading(true);
    setError(null);

    try {
      const addedTask = await addTodo(newTask);
      if (addedTask) {
        setTasks((prevTasks) => [...prevTasks, addedTask]);
        setTitle('');
        setContent('');
      }
    } catch (error) {
      setError('할 일을 추가하는 데 실패했습니다. 다시 시도해주세요.');
      console.error('Error adding task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <InputContainer>
      <Input
        type="text"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />
      <Input
        type="text"
        placeholder="내용을 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={loading}
      />
      <Button onClick={addTask} disabled={loading}>
        {loading ? <Loader /> : 'ToDo 생성'}
      </Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
}

export default ToDoInput;

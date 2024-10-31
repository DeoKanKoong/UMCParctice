import React, { useState } from 'react';
import styled from 'styled-components';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!/\S+@\S+\.\S+/.test(e.target.value)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8 || e.target.value.length > 16) {
      setPasswordError('비밀번호는 8자리 이상 16자리 이하이어야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const isFormValid = email && password && !emailError && !passwordError;

  return (
    <LoginContainer>
      <h1>로그인</h1>
      <Input
        type="email"
        value={email}
        onChange={handleEmailChange}
        onBlur={() => handleBlur('email')}
        placeholder="이메일을 입력해주세요!"
      />
      {touched.email && emailError && <ErrorMessage>{emailError}</ErrorMessage>}
      <Input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        onBlur={() => handleBlur('password')}
        placeholder="비밀번호를 입력해주세요!"
      />
      {touched.password && passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
      <Button disabled={!isFormValid} isValid={isFormValid}>
        로그인
      </Button>
    </LoginContainer>
  );
};

export default LoginPage;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: #fff;
  margin-top: -80px;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin: 0 0 10px;
`;

const Button = styled.button`
  width: 300px;
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: ${({ isValid }) => (isValid ? 'pointer' : 'not-allowed')};
  background-color: ${({ isValid }) => (isValid ? '#ff4d6d' : 'gray')}; /* 활성화된 경우 진한 핑크색 */
  color: #fff;
  transition: background-color 0.3s ease;
`;

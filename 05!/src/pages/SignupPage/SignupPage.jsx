import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('유효한 이메일 형식을 입력해주세요.')
    .required('이메일은 필수 입력 요소입니다.'),
  password: yup
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .max(16, '비밀번호는 최대 16자 이하여야 합니다.')
    .required('비밀번호는 필수 입력 요소입니다.'),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인은 필수 입력 요소입니다.')
});

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange' 
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <SignupContainer>
      <h1>회원가입</h1>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputWrapper>
          <StyledInput
            type="text"
            placeholder="이메일을 입력해주세요!"
            {...register('email')}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </InputWrapper>

        <InputWrapper>
          <StyledInput
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            {...register('password')}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </InputWrapper>

        <InputWrapper>
          <StyledInput
            type="password"
            placeholder="비밀번호를 다시 입력해주세요!"
            {...register('passwordCheck')}
          />
          {errors.passwordCheck && <ErrorMessage>{errors.passwordCheck.message}</ErrorMessage>}
        </InputWrapper>

        <Button type="submit">회원가입</Button>
      </Form>
    </SignupContainer>
  );
};

export default SignupPage;

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: #fff;
  margin-top: -50px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
  width: 300px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin: 5px 0 0;
`;

const Button = styled.button`
  width: 300px;
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  background-color: #ff4d6d;
  color: #fff;
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

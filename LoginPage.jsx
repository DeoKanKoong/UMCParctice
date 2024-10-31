import styled from "styled-components";
import useForm from '../hooks/use-form';
import { validateLogin } from "./utils/validate";

const Login = () => {
  const login = useForm({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validateLogin
  });

  const handlePressLogin = () => {
    console.log(login.values.email, login.values.password);
  };

  const isFormValid = !login.errors.email && !login.errors.password && login.values.email && login.values.password;

  return (
    <>
      <PageContainer>
        <MainContainer>
          <LoginText>로그인</LoginText>
          <StyledInput
            type={'email'}
            placeholder={'이메일을 입력해주세요!'}
            {...login.getTextInputProps('email')}
          />
          {login.touched.email && login.errors.email && <ErrorText>{login.errors.email}</ErrorText>}
          <StyledInput
            type={'password'}
            placeholder={'비밀번호를 입력해주세요!'}
            {...login.getTextInputProps('password')}
          />
          {login.touched.password && login.errors.password && <ErrorText>{login.errors.password}</ErrorText>}
          <SubmitButton
            type={'button'}
            onClick={handlePressLogin}
            disabled={!isFormValid}
            isFormValid={isFormValid}
            value="로그인"
          />
        </MainContainer> 
      </PageContainer>
    </>
  );
};

export default Login;

const PageContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 100px 0px 0px 0px;
  height: 100vh;
  background-color: black;
`;

const MainContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const StyledInput = styled.input`
  width: 400px;
  padding: 15px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
`;

const SubmitButton = styled.input`
  width: 430px;
  padding: 15px;
  border-radius: 8px;
  border: none;
  background-color: ${({ isFormValid }) => (isFormValid ? '#90AFFF' : '#333')};
  color: ${({ isFormValid }) => (isFormValid ? 'white' : '#999999')};
  font-size: 16px;
  cursor: ${({ isFormValid }) => (isFormValid ? 'pointer' : 'not-allowed')};
  transition: background-color 0.3s ease, color 0.3s ease;

  &:disabled {
    pointer-events: none;
  }
`;

const LoginText = styled.h1`
  color: white;
  margin-bottom: 30px;
`;

const ErrorText = styled.h1`
  color: red;
  font-size: 12px;
`;
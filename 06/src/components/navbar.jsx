import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Navbar = () => {
  const [nickname, setNickname] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const response = await axios.get('http://localhost:3000/user/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const email = response.data.email;
        setNickname(email.split('@')[0]);
      } catch (error) {
        console.error('유저 정보 불러오기 실패:', error);
        handleLogout();
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setNickname(null);
    navigate('/login');
  };

  return (
    <NavContainer>
      <Logo to="/">YONGCHA</Logo>
      <ButtonContainer>
        {nickname ? (
          <>
            <WelcomeText>안녕하세요, {nickname}님!</WelcomeText>
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          </>
        ) : (
          <>
            <StyledLink to="/login">로그인</StyledLink>
            <StyledLink to="/signup">회원가입</StyledLink>
          </>
        )}
      </ButtonContainer>
    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #111;
  color: white;
`;

const Logo = styled(Link)`
  font-size: 24px;
  color: #e63946;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    color: #f1faee;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const StyledLink = styled(Link)`
  padding: 10px 20px;
  border: 1px solid #fff;
  border-radius: 5px;
  text-decoration: none;
  color: white;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f1faee;
    color: #111;
  }
`;

const WelcomeText = styled.span`
  font-size: 16px;
  color: white;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  border: 1px solid #fff;
  border-radius: 5px;
  background-color: transparent;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f1faee;
    color: #111;
  }
`;

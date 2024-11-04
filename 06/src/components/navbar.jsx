import React, { useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../AutoContext';

const Navbar = () => {
  const { nickname, handleLogout, fetchUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchUserData();
  }, [location]);

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <NavContainer>
      <Logo to="/">YONGCHA</Logo>
      <ButtonContainer>
        {nickname ? (
          <>
            <WelcomeText>안녕하세요, {nickname}님!</WelcomeText>
            <LogoutButton onClick={handleLogoutClick}>로그아웃</LogoutButton>
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

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <NavContainer>
      <Logo to="/">YONGCHA</Logo>
      <ButtonContainer>
        <StyledLink to="/login">로그인</StyledLink>
        <StyledLink to="/signup">회원가입</StyledLink>
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

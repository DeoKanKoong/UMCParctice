import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaFilm } from "react-icons/fa"; 
import styled from "styled-components";

const Sidebar = () => {
    return (
        <SideNav>
            <StyledLink to="/search">
                <FaSearch /> 찾기
            </StyledLink>
            <StyledLink to="/movies">
                <FaFilm /> 영화
            </StyledLink>
        </SideNav>
    );
};

export default Sidebar;

const SideNav = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    background-color: #222;
    color: white;
    width: 200px;
`;

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;

    &:hover {
        background-color: #333;
        border-radius: 4px;
        color: #fff;
    }
`;

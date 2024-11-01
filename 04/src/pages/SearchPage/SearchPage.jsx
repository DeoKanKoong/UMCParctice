import React from "react";
import styled from "styled-components";

const SearchPage = () => {
    return (
        <Container>
            <Title>검색페이지 야호~!</Title>
        </Container>
    );
};

export default SearchPage;

const Container = styled.div`
    background-color: #000;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const Title = styled.h1`
    font-size: 36px;
    font-weight: bold;
`;

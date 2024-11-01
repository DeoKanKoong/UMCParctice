import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Movie1 from '../../assets/movie1.jpg';
import Movie2 from '../../assets/movie2.jpg';
import Movie3 from '../../assets/movie3.jpg';
import Movie4 from '../../assets/movie4.jpg';

const MoviesPage = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Title>카테고리</Title>
            <MovieGrid>
                <MovieCard onClick={() => navigate('/movies/now-playing')}>
                    <MovieImage src={Movie1} alt="현재 상영중인 영화" />
                    <Overlay>
                        <Text>현재 상영중인</Text>
                    </Overlay>
                </MovieCard>
                <MovieCard onClick={() => navigate('/movies/popular')}>
                    <MovieImage src={Movie2} alt="인기있는 영화" />
                    <Overlay>
                        <Text>인기있는</Text>
                    </Overlay>
                </MovieCard>
                <MovieCard onClick={() => navigate('/movies/top-rated')}>
                    <MovieImage src={Movie3} alt="높은 평가를 받은 영화" />
                    <Overlay>
                        <Text>높은 평가를 받은</Text>
                    </Overlay>
                </MovieCard>
                <MovieCard onClick={() => navigate('/movies/upcoming')}>
                    <MovieImage src={Movie4} alt="개봉 예정중인 영화" />
                    <Overlay>
                        <Text>개봉 예정중인</Text>
                    </Overlay>
                </MovieCard>
            </MovieGrid>
        </Container>
    );
};

export default MoviesPage;

const Container = styled.div`
    padding: 20px;
    color: white;
    background-color: #000;
    height: 100%;
`;

const Title = styled.h1`
    font-size: 36px;
    margin-bottom: 20px;
`;

const MovieGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    gap: 20px;
    padding: 10px 0;
`;

const MovieCard = styled.div`
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    &:hover {
        transform: scale(1.05); 
    }
`;

const MovieImage = styled.img`
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    border-radius: 8px;

    &:hover {
        opacity: 1;
    }
`;

const Text = styled.p`
    font-size: 18px;
    font-weight: bold;
    color: white;
    text-align: center;
`;

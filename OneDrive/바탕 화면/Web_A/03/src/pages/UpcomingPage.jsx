import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const UpcomingPage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const apiKey = import.meta.env.VITE_API_KEY;
            const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=ko-KR`);
            setMovies(response.data.results);
        };

        fetchMovies();
    }, []);

    return (
        <Container>
            <Title>개봉 예정중인 영화</Title>
            <MovieGrid>
                {movies.map(movie => (
                    <MovieCard key={movie.id}>
                        <MovieImage src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                        <Label>{movie.title}</Label>
                    </MovieCard>
                ))}
            </MovieGrid>
        </Container>
    );
};

export default UpcomingPage;

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
`;

const MovieCard = styled.div`
    position: relative;
    overflow: hidden;
    border-radius: 8px;
`;

const MovieImage = styled.img`
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
`;

const Label = styled.div`
    position: absolute;
    bottom: 10px;
    left: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px 10px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 5px;
`;

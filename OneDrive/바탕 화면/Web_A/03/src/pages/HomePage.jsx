import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const HomePage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const apiKey = import.meta.env.VITE_API_KEY;
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=ko-KR`);
                setMovies(response.data.results);
            } catch (error) {
                console.error('API 요청 실패:', error);
            }
        };

        getMovies();
    }, []);

    return (
        <Container>
            <MovieList>
                {movies.map((movie) => (
                    <MovieCard key={movie.id}>
                        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        <p>개봉일: {movie.release_date}</p>
                    </MovieCard>
                ))}
            </MovieList>
        </Container>
    );
};

export default HomePage;

const Container = styled.div`
    color: white;
    padding: 20px;
    h1 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 20px;
    }
`;

const MovieList = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
`;

const MovieCard = styled.div`
    text-align: center;
    img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        max-width: 150px;
    }
    h2 {
        font-size: 16px;
        margin-top: 10px;
        color: white;
    }
    p {
        font-size: 14px;
        color: #ccc;
    }
`;

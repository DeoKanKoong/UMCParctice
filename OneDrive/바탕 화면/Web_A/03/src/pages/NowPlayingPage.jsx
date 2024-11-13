import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const NowPlayingPage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const apiKey = import.meta.env.VITE_API_KEY;
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=ko-KR`
                );
                setMovies(response.data.results);
                console.log(response.data.results); // 데이터 로깅
            } catch (error) {
                console.error('API 요청 실패:', error); // 에러 로깅
            }
        };

        getMovies();
    }, []);

    return (
        <Container>
            <h1>현재 상영중인 영화</h1>
            <MovieList>
                {movies.map((movie) => (
                    <MovieCard key={movie.id}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <h2>{movie.title}</h2>
                    </MovieCard>
                ))}
            </MovieList>
        </Container>
    );
};

export default NowPlayingPage;

const Container = styled.div`
    color: white;
    padding: 20px;
`;

const MovieList = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
`;

const MovieCard = styled.div`
    text-align: center;
    img {
        width: 100%;
        height: auto;
        border-radius: 10px;
    }
    h2 {
        font-size: 16px;
        margin-top: 10px;
    }
`;

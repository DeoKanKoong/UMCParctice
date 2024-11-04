// SearchPage.jsx
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import debounce from "lodash/debounce";
import MovieCard from "../../components/Card/Card";
import SkeletonMovieCard from "../../components/SkeletonMovieCard";

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const apiKey = import.meta.env.VITE_API_KEY;

    const fetchMovies = async (query) => {
        setError("");
        setLoading(true);
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                params: {
                    api_key: apiKey,
                    language: "ko-KR",
                    query,
                },
            });
            setMovies(response.data.results || []);
            if (response.data.results.length === 0) setError("해당하는 데이터가 없습니다.");
        } catch (error) {
            setError("데이터를 가져오는 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetchMovies = useCallback(debounce(fetchMovies, 1000), []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.trim()) {
            debouncedFetchMovies(value);
        } else {
            setMovies([]);
            setError("영화 제목을 입력해주세요.");
        }
    };

    return (
        <Container>
            <SearchBar>
                <Input
                    type="text"
                    placeholder="영화 제목을 입력해주세요..."
                    value={query}
                    onChange={handleInputChange}
                />
                <Button onClick={() => debouncedFetchMovies(query)}>검색</Button>
            </SearchBar>
            {error ? (
                <Message>{error}</Message>
            ) : (
                <MovieList>
                    {loading ? (
                        Array.from({ length: 10 }).map((_, index) => (
                            <SkeletonMovieCard key={index} />
                        ))
                    ) : (
                        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
                    )}
                </MovieList>
            )}
        </Container>
    );
};

export default SearchPage;

const Container = styled.div`
    background-color: #000;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding: 20px;
`;

const SearchBar = styled.div`
    display: flex;
    width: 100%;
    max-width: 600px;
    margin-bottom: 50px;
`;

const Input = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px 0 0 4px;
    font-size: 16px;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 0 4px 4px 0;
    background-color: #ff4d6d;
    color: white;
    font-size: 16px;
    cursor: pointer;
`;

const MovieList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 70px;
    width: 100%;
    max-width: 1000px;
`;

const Message = styled.div`
    font-size: 18px;
    color: #ccc;
`;

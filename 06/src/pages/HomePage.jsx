import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';
import MovieCard from '../components/Card/Card';

const HomePage = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const { data, isLoading, isError } = useCustomFetch(`/movie/now_playing?api_key=${apiKey}&language=ko-KR`);

    if (isLoading) return <h1 style={{ color: 'white' }}>로딩 중...</h1>;
    if (isError) return <h1 style={{ color: 'white' }}>에러 발생</h1>;

    return (
        <Container>
            {data?.results?.length > 0 ? (
                <MovieList>
                    {data.results.map((movie) => (
                        <StyledLink to={`/movies/${movie.id}`} key={movie.id}>
                            <MovieCard movie={movie} showReleaseDate />
                        </StyledLink>
                    ))}
                </MovieList>
            ) : (
                <h1 style={{ color: 'white' }}>영화 목록이 없습니다.</h1>
            )}
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

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

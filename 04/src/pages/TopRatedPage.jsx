import styled from 'styled-components';
import useCustomFetch from '../hooks/useCustomFetch';
import { useNavigate } from 'react-router-dom';

const TopRatedPage = () => {
    const apiKey = import.meta.env.VITE_API_KEY; 
    const { data, isLoading, isError } = useCustomFetch(`/movie/top_rated?api_key=${apiKey}&language=ko-KR`);
    const navigate = useNavigate();

    const handleClick = (movieId) => {
        navigate(`/movies/${movieId}`);
    };

    if (isLoading) return <h1 style={{color:'white'}}>로딩 딩 딩 딩 딩중</h1>
    
    if (isError) return <h1 style={{color:white}}>에러 러 러 러 러중</h1>

    return (
        <Container>
            <Title>높은 평가를 받은 영화</Title>
                {data?.results && (
                    <MovieList>
                        {data.results.map(movie => (
                            <MovieCard key={movie.id} onClick={() => handleClick(movie.id)}>
                                <MovieImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                <Label>{movie.title}</Label>
                            </MovieCard>
                        ))}
                    </MovieList>
                )}
        </Container>
    );
};

export default TopRatedPage;

const Container = styled.div`
    color: white;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 36px;
    margin-top: -20px;
    padding: 20px;
    text-align: center;
`;

const MovieList = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
`;

const MovieCard = styled.div`
    text-align: center;

    a {
        text-decoration: none;
        color: inherit;
    }

    img {
        width: 200px;
        height: 300px;
        object-fit: cover;
        border-radius: 10px;
        transition: transform 0.3s ease;
    }
    
    img:hover {
        transform: scale(1.1);
    }
`;

const MovieImage = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
`;

const Label = styled.h2`
    font-size: 16px;
    margin-top: 10px;
    color: white;
`;
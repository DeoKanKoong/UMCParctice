import styled from 'styled-components';
import useCustomFetch from '../hooks/useCustomFetch';

const HomePage = () => {
    const apiKey = import.meta.env.VITE_API_KEY; 
    const { data, isLoading, isError } = useCustomFetch(`/movie/now_playing?api_key=${apiKey}&language=ko-KR`);

    if (isLoading) return <h1 style={{color:'white'}}>로딩 딩 딩 딩 딩중</h1>
    
    if (isError) return <h1 style={{color:white}}>에러 러 러 러 러중</h1>
    
    return (
        <Container>
            {data?.results && (
                <MovieList>
                    {data.results.map((movie) => (
                        <MovieCard key={movie.id}>
                            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
                            <h2>{movie.title}</h2>
                            <p>개봉일: {movie.release_date}</p>
                        </MovieCard>
                    ))}
                </MovieList>
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

const MovieCard = styled.div`
    text-align: center;

    img {
        width: 200px;
        height: 300px;
        object-fit: cover;
        border-radius: 10px;
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


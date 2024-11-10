import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const fetchMovieDetails = async ({ queryKey }) => {
  const [_, movieId] = queryKey;
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_MOVIE_API_URL;
  const response = await fetch(`${apiUrl}/movie/${movieId}?api_key=${apiKey}&language=ko-KR`);

  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return response.json();
};

const fetchMovieCredits = async ({ queryKey }) => {
  const [_, movieId] = queryKey;
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_MOVIE_API_URL;
  const response = await fetch(`${apiUrl}/movie/${movieId}/credits?api_key=${apiKey}&language=ko-KR`);

  if (!response.ok) {
    throw new Error('Failed to fetch movie credits');
  }
  return response.json();
};

const MovieDetailPage = () => {
  const { movieId } = useParams();

  const { data: movie, isLoading: movieLoading, isError: movieError } = useQuery({
    queryKey: ['movieDetails', movieId],
    queryFn: fetchMovieDetails,
  });

  const { data: creditsData, isLoading: creditsLoading, isError: creditsError } = useQuery({
    queryKey: ['movieCredits', movieId],
    queryFn: fetchMovieCredits,
  });

  if (movieLoading || creditsLoading) return <h1 style={{ color: 'white' }}>로딩중...</h1>;
  if (movieError || creditsError) return <h1 style={{ color: 'white' }}>에러 발생</h1>;

  if (!movie || !creditsData) return null;

  const credits = creditsData.cast || [];

  return (
    <Container>
      {movie.backdrop_path ? (
        <MovieHeader $backdrop={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}>
          <GradientOverlay />
          <MovieInfo>
            <h1>{movie.title}</h1>
            <p>평균 평점: {movie.vote_average}</p>
            <p>개봉일: {movie.release_date}</p>
            <p>{movie.overview}</p>
          </MovieInfo>
        </MovieHeader>
      ) : (
        <FallbackHeader>
          <h1>{movie.title}</h1>
        </FallbackHeader>
      )}
      <CastSection>
        <h2>감독/출연</h2>
        <CastList>
          {credits.slice(0, 12).map((cast) => (
            <CastCard key={cast.cast_id}>
              {cast.profile_path ? (
                <img src={`https://image.tmdb.org/t/p/w300${cast.profile_path}`} alt={cast.name} />
              ) : (
                <FallbackImage>이미지 없음</FallbackImage>
              )}
              <p>{cast.name}</p>
              <p>{cast.character}</p>
            </CastCard>
          ))}
        </CastList>
      </CastSection>
    </Container>
  );
};

export default MovieDetailPage;

const Container = styled.div`
  color: white;
  padding: 20px;
`;

const MovieHeader = styled.div`
  background-image: url(${(props) => props.$backdrop});
  background-size: cover;
  background-position: center;
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 50px;
`;

const FallbackHeader = styled.div`
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333;
  color: white;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3), transparent);
  z-index: 1;
`;

const MovieInfo = styled.div`
  position: relative;
  z-index: 2;
  color: white;
  max-width: 600px;

  h1 {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  p {
    margin: 10px 0;
  }
`;

const CastSection = styled.div`
  margin-top: 50px;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

const CastList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
`;

const CastCard = styled.div`
  text-align: center;
  width: 150px;
  
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 2px solid white;
    transition: transform 0.3s ease;
  }

  img:hover {
    transform: scale(1.1);
  }

  p:nth-of-type(2) {
    font-size: 15px;
    color: gray;
  }
`;

const FallbackImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
`;

import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useCustomFetch from '../hooks/useCustomFetch';

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;
  const { data: movie, isLoading, isError } = useCustomFetch(`/movie/${movieId}?api_key=${apiKey}&language=ko-KR`);
  const { data: creditsData } = useCustomFetch(`/movie/${movieId}/credits?api_key=${apiKey}&language=ko-KR`);
  const credits = creditsData?.cast || [];

  if (isLoading) return <h1 style={{color:'white'}}>로딩 딩 딩 딩 딩중</h1>
    
  if (isError) return <h1 style={{color:white}}>에러 러 러 러 러중</h1>
  

  return (
    <Container>
      <MovieHeader $backdrop={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}>
        <GradientOverlay />
        <MovieInfo>
          <h1>{movie.title}</h1>
          <p>평균 평점: {movie.vote_average}</p>
          <p>개봉일: {movie.release_date}</p>
          <p>{movie.overview}</p>
        </MovieInfo>
      </MovieHeader>

      <CastSection>
        <h2>감독/출연</h2>
        <CastList>
          {credits.slice(0, 12).map((cast) => (
            <CastCard key={cast.cast_id}>
              <img src={`https://image.tmdb.org/t/p/w300${cast.profile_path}`} alt={cast.name} />
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
  background-image: url(${props => props.$backdrop});
  background-size: cover;
  background-position: center;
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 50px;
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

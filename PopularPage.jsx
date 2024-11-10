import { useInfiniteQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SkeletonMovieCard from '../components/SkeletonMovieCard';
import { useEffect, useRef } from 'react';

const fetchPopularMovies = async ({ pageParam = 1 }) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_MOVIE_API_URL;
  const response = await fetch(`${apiUrl}/movie/popular?api_key=${apiKey}&language=ko-KR&page=${pageParam}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const PopularPage = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['popularMovies'],
    queryFn: fetchPopularMovies,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
  });

  const navigate = useNavigate();
  const observerRef = useRef();

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    }, { threshold: 1.0 });

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) {
    return (
      <SkeletonContainer>
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonMovieCard key={index} />
        ))}
      </SkeletonContainer>
    );
  }

  if (isError) return <h1 style={{ color: 'white' }}>에러 발생</h1>;

  return (
    <Container>
      <Title>인기있는 영화</Title>
      <MovieList>
        {data.pages.flatMap((page) =>
          page.results.map((movie) => (
            <MovieCard key={movie.id} onClick={() => navigate(`/movies/${movie.id}`)}>
              <MovieImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <Label>{movie.title}</Label>
            </MovieCard>
          ))
        )}
      </MovieList>
      <div ref={observerRef} style={{ height: '20px', background: 'transparent' }} />
      {isFetchingNextPage && <SkeletonMovieCard />}
    </Container>
  );
};

export default PopularPage;

const Container = styled.div`
  color: white;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 36px;
  text-align: center;
`;

const MovieList = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
`;

const MovieCard = styled.div`
  text-align: center;
  cursor: pointer;

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

const SkeletonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
`;

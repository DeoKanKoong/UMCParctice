import { useInfiniteQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import SkeletonMovieCard from '../components/SkeletonMovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

const fetchNowPlayingMovies = async ({ pageParam = 1 }) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_MOVIE_API_URL;
  const response = await fetch(`${apiUrl}/movie/now_playing?api_key=${apiKey}&language=ko-KR&page=${pageParam}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const NowPlayingPage = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['nowPlayingMovies'],
    queryFn: fetchNowPlayingMovies,
    getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });

  const observerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    }, { threshold: 1.0 });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <h1 style={{ color: 'white' }}>에러 발생</h1>;

  return (
    <Container>
      <Title>현재 상영중인 영화</Title>
      {data?.pages && (
        <MovieList>
          {data.pages.flatMap((page) =>
            page.results.map((movie) => (
              <MovieCard key={movie.id}>
                <Link to={`/movies/${movie.id}`}>
                  <MovieImage src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                  <Label>{movie.title}</Label>
                </Link>
              </MovieCard>
            ))
          )}
        </MovieList>
      )}
      <div ref={observerRef} style={{ height: '20px', background: 'transparent' }} />
      {isFetchingNextPage && <p style={{ color: 'white', textAlign: 'center' }}>로딩중...</p>}
    </Container>
  );
};

export default NowPlayingPage;

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

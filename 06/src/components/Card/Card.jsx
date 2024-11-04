import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MovieCard = ({ movie, showReleaseDate }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movies/${movie.id}`);
    };

    return (
        <Card onClick={handleClick}>
            <Poster src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
            <Info>
                <Title>{movie.title}</Title>
                {showReleaseDate && <ReleaseDate>{movie.release_date}</ReleaseDate>}
            </Info>
        </Card>
    );
};

export default MovieCard;

const Card = styled.div`
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

const Poster = styled.img`
    width: 100%;
    height: 250px;
    object-fit: cover;
`;

const Info = styled.div`
    padding: 10px 0;
`;

const Title = styled.h3`
    font-size: 16px;
    margin: 5px 0;
    color: white;
`;

const ReleaseDate = styled.p`
    font-size: 14px;
    color: #aaa;
`;

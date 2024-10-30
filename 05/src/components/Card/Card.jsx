import styled from "styled-components";

const MovieCard = ({ movie }) => {
    return (
        <Card>
            <Poster src={movie.posterUrl} alt={movie.title} />
            <Info>
                <Title>{movie.title}</Title>
                <ReleaseDate>{movie.releaseDate}</ReleaseDate>
            </Info>
        </Card>
    );
};

export default MovieCard;

const Card = styled.div`
    background-color: #1c1c1c;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-align: center;
    color: white;
`;

const Poster = styled.img`
    width: 100%;
    height: auto;
    border-bottom: 2px solid #333;
`;

const Info = styled.div`
    padding: 10px;
`;

const Title = styled.h3`
    font-size: 16px;
    margin: 5px 0;
`;

const ReleaseDate = styled.p`
    font-size: 14px;
    color: #aaa;
`;

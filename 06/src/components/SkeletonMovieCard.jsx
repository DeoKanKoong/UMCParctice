import React from "react";
import styled from "styled-components";

const SkeletonMovieCard = () => {
    return (
        <Card>
            <Poster />
            <Info>
                <Title />
                <ReleaseDate />
            </Info>
        </Card>
    );
};

export default SkeletonMovieCard;

const Card = styled.div`
    background-color: #1c1c1c;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 300px;
`;

const Poster = styled.div`
    width: 100%;
    height: 200px;
    background-color: #333;
`;

const Info = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Title = styled.div`
    width: 80%;
    height: 20px;
    background-color: #444;
    border-radius: 4px;
`;

const ReleaseDate = styled.div`
    width: 60%;
    height: 16px;
    background-color: #444;
    border-radius: 4px;
`;

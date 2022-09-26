import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getMovies, Movies, Movie } from "../api";
import styled from "styled-components";
import { getImage } from "../utils";
// styled-components
const Wrap = styled.div`
    background-color: rgb(45, 52, 54);
`;
const Loader = styled.div`
    height: 20vh;
    text-align: center;
`;
const Banner = styled.div<{ bgUrl?: string }>`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
        url(${(props) => props.bgUrl});
    background-size: cover;
    color: white;
`;
const Title = styled.h1`
    font-size: 68px;
    margin-bottom: 20px;
`;
const OverView = styled.p`
    font-size: 20px;
    width: 40%;
`;
export default function Home() {
    const { isLoading, data } = useQuery<Movies>(["getMovies"], getMovies);
    if (isLoading) return <>Loading</>;
    return (
        <Wrap>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Banner bgUrl={getImage(data?.results[0].backdrop_path!)}>
                        <Title>{data?.results[0].title}</Title>
                        <OverView>{data?.results[0].overview}</OverView>
                    </Banner>
                </>
            )}
        </Wrap>
    );
}

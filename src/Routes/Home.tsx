import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getMovies, getImage, Movies, Movie } from "../api";
import styled from "styled-components";
// styled-components
const Wrap = styled.div`
    background-color: rgb(45, 52, 54);
`;
const Loader = styled.div`
    height: 20vh;
    text-align: center;
`;

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>();
    const { isLoading } = useQuery<Movies>(["getMovies"], getMovies, {
        onSuccess(data) {
            setMovies(data.results);
        },
    });
    if (isLoading) return <>Loading</>;
    return (
        <Wrap>
            {isLoading && <Loader>Loading...</Loader>}

            {movies?.map((movie) => (
                <div>{movie.title}</div>
            ))}
        </Wrap>
    );
}

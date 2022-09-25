import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getMovies, getImage, Movies, Movie } from "../api";

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>();
    const { isLoading } = useQuery<Movies>(["getMovies"], getMovies, {
        onSuccess(data) {
            setMovies(data.results);
        },
    });
    if (isLoading) return <>Loading</>;
    return (
        <div>
            <h1>Home</h1>
            {movies?.map((movie) => (
                <div>{movie.title}</div>
            ))}
        </div>
    );
}

import React from "react";
import { useQuery } from "react-query";
import { getMovies, getImage } from "../api";

export interface Movie {
    adult?: boolean;
    backdrop_path?: string;
    genre_ids?: number[];
    id?: number;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    release_date?: Date;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
}

export default function Home() {
    const { isLoading, data } = useQuery(["getMovies"], getMovies);
    // const { results }: { results: Movie[] } = isLoading ? null : data;
    console.log(data, isLoading);
    return <div style={{ height: "300vh" }}>Home</div>;
}

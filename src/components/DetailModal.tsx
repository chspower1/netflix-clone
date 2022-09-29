import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { getMovie, Movie, MovieDetail } from "../api";
import { BoxImg } from "./Slider";
import { getImage } from "../utils";

const Wrap = styled(motion.div)`
    border-radius: 10px;
    background-color: transparent;
    width: 100%;
    height: 100%;
`;

interface DetailModal {
    movieId: string;
    layoutId: string;
}

export default function DetailModal({ movieId, layoutId }: DetailModal) {
    console.log(movieId);
    const { data: movie, isLoading } = useQuery<MovieDetail>(["getMovie"], () => getMovie(movieId));
    return (
        <Wrap>
            <BoxImg src={getImage(movie?.backdrop_path!, "w500")} layoutId={layoutId} alt="#" />
            {movie?.title}
        </Wrap>
    );
}

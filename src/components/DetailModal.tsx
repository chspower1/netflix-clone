import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { getMovie, Movie, MovieDetail } from "../api";

const Wrap = styled(motion.div)`
    border-radius: 10px;
    background-color: red;
    width: 100%;
    height: 100%;
`;
export default function DetailModal({ movieId }: { movieId: string }) {
    console.log(movieId);
    const { data, isLoading } = useQuery<MovieDetail>(["getMovie"], () => getMovie(movieId));
    return <Wrap>{data?.title}</Wrap>;
}

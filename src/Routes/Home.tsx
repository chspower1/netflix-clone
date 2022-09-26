import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getMovies, Movies, Movie } from "../api";
import styled from "styled-components";
import { getImage } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useMatch } from "react-router-dom";
// styled-components
const Wrap = styled.div`
    background-color: rgb(45, 52, 54);
    margin-bottom: 500px;
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
const Slider = styled(motion.div)`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 200px;
`;
const Row = styled(motion.div)`
    position: absolute;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    width: 100%;
    height: 100%;
    /* gap: 5px; */
`;
const Box = styled(motion.div)`
    background-color: white;
    transform-origin: bottom center;
    height: 100%;
    cursor: pointer;
    &:first-child {
        transform-origin: bottom left;
    }
    &:last-child {
        transform-origin: bottom right;
    }
`;
const BoxRank = styled(motion.h1)`
    font-size: 40px;
    top: 10px;
    left: 10px;
`;
const BoxImg = styled(motion.img)`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
const BoxInfo = styled(motion.div)`
    position: fixed;
    /* transform-origin: top center; */
    opacity: 0;
    width: 100%;
    height: 100px;
    padding: 20px;
    background-color: rgb(36, 37, 37);
`;

const ArrowBtn = styled(motion.button)`
    z-index: 1000;
    position: absolute;
    height: 100%;
    width: 60px;
    background-color: rgba(0, 0, 0, 0.3);
    border: none;
    transform-origin: center center;
`;
const LeftBtn = styled(ArrowBtn)`
    left: 0;
`;
const RightBtn = styled(ArrowBtn)`
    right: 0px;
`;
const Svg = styled(motion.svg)`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    width: 30px;
    height: 30px;
`;
const MovieModal = styled(motion.div)`
    z-index: 1000;
    width: 50vw;
    height: 50vh;
    background-color: white;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
`;
const Overlay = styled(motion.div)`
    z-index: 100;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0px;
`;
// Variants
const sliderVariants = {
    initial: (next: boolean) => ({ x: next ? window.innerWidth + 10 : -window.innerWidth - 10 }),
    animate: { x: 0, transition: { type: "tween", duration: 1 } },
    exit: (next: boolean) => ({
        x: next ? -window.innerWidth - 10 : window.innerWidth + 10,
        transition: { duration: 1 },
    }),
};
const arrowVariants = {
    initial: {
        opacity: 0,
    },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};
const arrowBtnVariants = {
    initial: {
        scaleY: 0,
    },
    animate: { scaleY: 1 },
    exit: { scaleY: 0 },
};
const boxVariants = {
    hover: {
        scale: 1.3,

        transition: {
            delay: 0.3,
            duration: 0.3,
        },
    },
};
const boxInfoVariants = {
    initial: { y: -5 },
    hover: {
        opacity: 1,
        y: -5,
        transition: {
            type: "tween",
            delay: 0.3,
            duration: 0.3,
        },
    },
};

const modalVariants = {
    animate: {
        scale: 1,
    },
    exit: {
        scale: 0,
    },
};

const offset = 6;
export default function Home() {
    const { isLoading, data } = useQuery<Movies>(["getMovies"], getMovies);
    const [next, setNext] = useState(true);
    const [page, setPage] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const navigate = useNavigate();
    const movieMatch = useMatch("/movies/:movieId");
    console.log(movieMatch);
    const toggleLeaving = () => {
        setLeaving((prev) => !prev);
    };
    const onClickSlide = (next: boolean) => {
        if (data) {
            if (leaving) return console.log(leaving);
            setNext(next);
            toggleLeaving();
            const maxPage = Math.floor((data?.results.length - 1) / offset) - 1;
            setPage((prev) =>
                next ? (prev === maxPage ? 0 : prev + 1) : prev === 0 ? maxPage : prev - 1
            );
            console.log(data?.results.length, maxPage, page);
        }
    };
    const onClickBox = (movieId: number) => {
        navigate(`/movies/${movieId}`);
    };
    if (isLoading) return <Loader>Loading</Loader>;
    return (
        <Wrap>
            <Banner bgUrl={getImage(data?.results[0].backdrop_path!)}>
                <Title>{data?.results[0].title}</Title>
                <OverView>{data?.results[0].overview}</OverView>
            </Banner>
            <Slider>
                <AnimatePresence>
                    <LeftBtn
                        variants={arrowVariants}
                        initial="initial"
                        whileHover="animate"
                        exit="exit"
                        onClick={() => onClickSlide(false)}
                    >
                        <Svg
                            variants={arrowBtnVariants}
                            fill="white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                        >
                            <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                        </Svg>
                    </LeftBtn>
                    <RightBtn
                        variants={arrowVariants}
                        initial="initial"
                        whileHover="animate"
                        exit="exit"
                        onClick={() => onClickSlide(true)}
                    >
                        <Svg
                            variants={arrowBtnVariants}
                            fill="white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                        >
                            <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                        </Svg>
                    </RightBtn>
                </AnimatePresence>
                <AnimatePresence initial={true} custom={next} onExitComplete={toggleLeaving}>
                    <Row
                        custom={next}
                        variants={sliderVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key={page}
                    >
                        {data?.results
                            .slice(1)
                            .slice(offset * page, offset * page + offset)
                            .map((movie, index) => (
                                <Box
                                    onClick={() => onClickBox(movie?.id!)}
                                    layoutId={String(movie?.id!)}
                                    key={movie.id}
                                    variants={boxVariants}
                                    initial="initial"
                                    whileHover="hover"
                                    transition={{ duration: 0.4, type: "tween" }}
                                >
                                    <BoxImg src={getImage(movie.backdrop_path!, "w500")} alt="#" />

                                    <BoxInfo variants={boxInfoVariants}>{movie.title}</BoxInfo>
                                </Box>
                            ))}
                    </Row>
                </AnimatePresence>
                <AnimatePresence>
                    {movieMatch?.params && (
                        <>
                            <Overlay
                                initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                                animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                                exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                                transition={{ duration: 0.4 }}
                                onClick={() => navigate("/")}
                            ></Overlay>
                            <MovieModal
                                layoutId={String(movieMatch?.params.movieId)}
                                transition={{ duration: 0.4 }}
                            >
                                {movieMatch?.params.movieId}
                            </MovieModal>
                        </>
                    )}
                </AnimatePresence>
            </Slider>
        </Wrap>
    );
}

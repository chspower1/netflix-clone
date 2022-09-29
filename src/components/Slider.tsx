import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { getMovies, Movies } from "../api";
import DetailModal from "./DetailModal";
import { getImage } from "../utils";
import { useQuery } from "react-query";
import { useMediaQuery } from "react-responsive";

// Styled-components
const Wrap = styled(motion.div)`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 400px;
    margin-bottom: 100px;
`;
const Title = styled.h1`
    position: absolute;
    top: -10px;

    font-size: 28px;
    color: white;
`;
const Row = styled(motion.div)`
    position: absolute;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    @media screen and (max-width: 1550px) {
        grid-template-columns: repeat(6, 1fr);
    }
    @media screen and (max-width: 1200px) {
        grid-template-columns: repeat(5, 1fr);
    }
    gap: 10px;
`;
const Box = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    transform-origin: bottom center;
    background-color: transparent;
    cursor: pointer;
    &:first-child {
        transform-origin: bottom left;
    }
    &:last-child {
        transform-origin: bottom right;
    }
`;
export const BoxImg = styled(motion.img)`
    width: 100%;
    height: 335px;
    object-fit: cover;
    border-radius: 5px;
    transform-origin: center center;
`;
const BoxInfo = styled(motion.div)`
    position: absolute;
    bottom: 0;
    transform-origin: top center;
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
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    background-color: transparent;
    transform-origin: center center;
`;
const Overlay = styled(motion.div)`
    z-index: 100;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0px;
`;
const PointerBox = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
`;
const Pointer = styled(motion.div)<{ index: number; page: number }>`
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${(props) =>
        props.index === props.page ? "rgba(255, 255, 255,1)" : "rgba(255, 255, 255, 0.5)"};
    margin: 0px 3px;
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
        y: -15,
        transition: {
            duration: 0.4,
        },
    },
};
const boxInfoVariants = {
    initial: { y: 20 },
    hover: {
        opacity: 1,
        y: 0,
        transition: {
            type: "tween",
            delay: 0.3,
            duration: 0.3,
        },
    },
};
const modalVariants = {
    exit: {
        scale: 1,
        transition: {
            duration: 0.4,
        },
    },
};

interface SliderProps {
    category: string;
}
export default function Slider({ category }: SliderProps) {
    const { data: movies, isLoading } = useQuery<Movies>([`${category}Movies`], () =>
        getMovies(`${category}`)
    );
    const [next, setNext] = useState(true);
    const [page, setPage] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const [modalBgUrl, setModalBgUrl] = useState("");
    const navigate = useNavigate();
    const movieMatch = useMatch(`/movies/${category}/:movieId`);
    const toggleLeaving = () => {
        setLeaving((prev) => !prev);
    };
    const [offset, setOffset] = useState(8);
    const isMediumScreen = useMediaQuery({ maxWidth: 1200 });
    const isBigScreen = useMediaQuery({ maxWidth: 1550 });
    console.log(category, movies);
    const onClickSlide = (next: boolean) => {
        if (movies) {
            if (leaving) return console.log(leaving);
            setNext(next);
            toggleLeaving();
            const maxPage = Math.floor((movies?.results.length - 1) / offset);
            setPage((prev) =>
                next ? (prev === maxPage ? 0 : prev + 1) : prev === 0 ? maxPage : prev - 1
            );
            console.log(movies?.results.length, maxPage, page);
            console.log(movieMatch);
        }
    };
    const onClickBox = (movieId: number, bgUrl: string) => {
        navigate(`/movies/${category}/${movieId}`);
        setModalBgUrl(bgUrl);
    };
    const createPointer = (num: number) => {
        const pointerArr = [];
        if (movies) {
            for (let i = 0; i < movies?.results!.length / offset; i++) {
                console.log(offset);
                pointerArr.push(<Pointer index={i} page={page} />);
            }
        }
        return pointerArr;
    };
    useEffect(() => {
        if (isMediumScreen && isBigScreen) {
            setOffset(5);
            console.log(isMediumScreen, isBigScreen);
        } else if (isBigScreen) {
            setOffset(6);
            console.log(isMediumScreen, isBigScreen);
        } else {
            setOffset(8);
            console.log(isMediumScreen, isBigScreen);
        }
    }, [isMediumScreen, isBigScreen]);

    if (isLoading) return null;
    return (
        <Wrap>
            <PointerBox>{createPointer(offset)}</PointerBox>
            <Title>{category.toUpperCase()}</Title>
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
                    {movies?.results
                        .slice(1)
                        .slice(offset * page, offset * page + offset)
                        .map((movie, index) => (
                            <Box
                                onClick={() => onClickBox(movie?.id!, movie?.backdrop_path!)}
                                layoutId={`${movie?.id!}_${category}`}
                                key={`${movie?.id!}_${category}`}
                                variants={boxVariants}
                                initial="initial"
                                whileHover="hover"
                                transition={{ duration: 0.4, type: "tween" }}
                            >
                                <BoxImg
                                    src={getImage(movie?.poster_path!, "w500")}
                                    layoutId={`${movie?.id!}_${category}_img`}
                                    alt="#"
                                />

                                <BoxInfo variants={boxInfoVariants}>{movie.title}</BoxInfo>
                            </Box>
                        ))}
                </Row>
            </AnimatePresence>
            <AnimatePresence>
                {movieMatch && (
                    <>
                        <Overlay
                            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                            animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                            transition={{ duration: 0.4 }}
                            onClick={() => navigate("/")}
                        />
                        <MovieModal
                            layoutId={`${movieMatch?.params.movieId}_${category}`}
                            transition={{ duration: 0.4, type: "tween" }}
                        >
                            <BoxImg
                                src={getImage(modalBgUrl, "original")}
                                layoutId={`${movieMatch?.params.movieId}_${category}_img`}
                                transition={{ duration: 0.4 }}
                            />
                        </MovieModal>
                    </>
                )}
            </AnimatePresence>
        </Wrap>
    );
}

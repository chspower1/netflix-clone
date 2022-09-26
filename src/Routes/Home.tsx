import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getMovies, Movies, Movie } from "../api";
import styled from "styled-components";
import { getImage } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
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
const Slider = styled(motion.div)`
    position: relative;
    width: 100%;
    height: 200px;
`;
const Row = styled(motion.div)`
    position: absolute;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    width: 100%;
    gap: 10px;
`;
const Box = styled(motion.div)`
    background-color: white;
    height: 200px;
`;

const ArrowBtn = styled(motion.button)`
    z-index: 1000;
    position: absolute;
    top: 50%;
`;
const LeftBtn = styled(ArrowBtn)`
    left: 20px;
`;
const RightBtn = styled(ArrowBtn)`
    right: 20px;
`;
const Svg = styled(motion.svg)`
    width: 30px;
    height: 30px;
`;

// Variants
const sliderVariants = {
    initial: (next: boolean) => ({ x: next ? -window.outerWidth - 10 : window.outerWidth + 10 }),
    animate: { x: 0, transition: { duration: 1 } },
    exit: (next: boolean) => ({
        x: next ? window.outerWidth + 10 : -window.outerWidth - 10,
        transition: { duration: 1 },
    }),
};

export default function Home() {
    const { isLoading, data } = useQuery<Movies>(["getMovies"], getMovies);
    const [next, setNext] = useState(true);
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const toggleLeaving = () => {
        setLeaving((prev) => !prev);
    };
    const onClickSlide = (next: boolean) => {
        if (leaving) return;
        setNext(next);
        toggleLeaving();
        setIndex((prev) => prev - 1);
    };
    if (isLoading) return <Loader>Loading</Loader>;
    return (
        <Wrap>
            <Banner bgUrl={getImage(data?.results[0].backdrop_path!)}>
                <Title>{data?.results[0].title}</Title>
                <OverView>{data?.results[0].overview}</OverView>
            </Banner>
            <Slider>
                <LeftBtn onClick={() => onClickSlide(false)}>
                    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                    </Svg>
                </LeftBtn>
                <RightBtn onClick={() => onClickSlide(true)}>
                    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                    </Svg>
                </RightBtn>
                <AnimatePresence custom={next} onExitComplete={toggleLeaving}>
                    <Row
                        custom={next}
                        variants={sliderVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key={index}
                    >
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Box key={i}>{i}</Box>
                        ))}
                    </Row>
                </AnimatePresence>
            </Slider>
        </Wrap>
    );
}

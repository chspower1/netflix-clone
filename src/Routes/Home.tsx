import { useQueries, useQuery } from "react-query";
import { getMovies, Movies, Movie } from "../api";
import styled from "styled-components";
import { getImage } from "../utils";
import Slider from "./../components/Slider";
// styled-components
const Wrap = styled.div`
    background-color: rgb(0, 0, 0);
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
    margin-bottom: -130px;
`;
const Title = styled.h1`
    font-size: 68px;
    margin-bottom: 20px;
`;
const OverView = styled.p`
    font-size: 20px;
    width: 40%;
`;
const Sliders = styled.div`
    padding: 0px 30px;
`;
export default function Home() {
    const { isLoading, data: movies } = useQuery<Movies>(["getMovies"], () =>
        getMovies("now_playing")
    );
    if (isLoading) return <Loader>Loading</Loader>;
    return (
        <Wrap>
            <Banner bgUrl={getImage(movies?.results[0].backdrop_path!)}>
                <Title>{movies?.results[0].title}</Title>
                <OverView>{movies?.results[0].overview}</OverView>
            </Banner>
            <Sliders>
                <Slider category="now_playing" />
                <Slider category="popular" />
                <Slider category="top_rated" />
            </Sliders>
        </Wrap>
    );
}

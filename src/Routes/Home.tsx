import { useQueries, useQuery } from "react-query";
import { getMovies, Movies, Movie } from "../api";
import styled from "styled-components";
import { getImage } from "../utils";
import Slider from "./../components/Slider";
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

export default function Home() {
    const { isLoading, data: movies } = useQuery<Movies>(["getMovies"], getMovies);
    const results = useQueries([
        {
            queryKey: ["getMovies", 1],
            queryFn: getMovies,
        },
        {
            queryKey: ["getMovies", 2],
            queryFn: getMovies,
        },
    ]);
    console.log(results[0].data);
    if (isLoading) return <Loader>Loading</Loader>;
    return (
        <Wrap>
            <Banner bgUrl={getImage(movies?.results[0].backdrop_path!)}>
                <Title>{movies?.results[0].title}</Title>
                <OverView>{movies?.results[0].overview}</OverView>
            </Banner>
            <Slider movies={movies!} title="Playing Now!" />
        </Wrap>
    );
}

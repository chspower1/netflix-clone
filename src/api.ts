const API_KEY = "1a301bdc4abdaca0b146fc986fe4436c";
const BASE_PATH = "https://api.themoviedb.org/3";
const BASE_IMG_PATH = "https://image.tmdb.org/t/p/original";
export async function getMovies() {
    return await (
        await fetch(
            `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`
        )
    ).json();
}
export function getImage(movieId: string) {
    return `${BASE_IMG_PATH}${movieId}`;
}

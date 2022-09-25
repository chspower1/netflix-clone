const API_KEY = "1a301bdc4abdaca0b146fc986fe4436c";
const BASE_PATH = "https://api.themoviedb.org/3";
const BASE_IMG_PATH = "https://image.tmdb.org/t/p/original";

export interface Movies {
    data: MoviesDate;
    page: 1;
    results: Movie[];
    total_pages: 4;
    total_results: 62;
}
export interface MoviesDate {
    maximun: string;
    minimum: string;
}
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

const API_KEY = "1a301bdc4abdaca0b146fc986fe4436c";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface Movies {
    dates: MovieDate;
    page: 1;
    results: Movie[];
    total_pages: 4;
    total_results: 62;
}
export interface MovieDate {
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

export interface MovieDetail {
    adult?: boolean;
    backdrop_path?: string;
    belongs_to_collection?: BelongsToCollection;
    budget?: number;
    genres?: Genre[];
    homepage?: string;
    id?: number;
    imdb_id?: string;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    production_companies?: ProductionCompany[];
    production_countries?: ProductionCountry[];
    release_date?: Date;
    revenue?: number;
    runtime?: number;
    spoken_languages?: SpokenLanguage[];
    status?: string;
    tagline?: string;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
}

export interface BelongsToCollection {
    id?: number;
    name?: string;
    poster_path?: string;
    backdrop_path?: string;
}

export interface Genre {
    id?: number;
    name?: string;
}

export interface ProductionCompany {
    id?: number;
    logo_path?: null | string;
    name?: string;
    origin_country?: string;
}

export interface ProductionCountry {
    iso_3166_1?: string;
    name?: string;
}

export interface SpokenLanguage {
    english_name?: string;
    iso_639_1?: string;
    name?: string;
}
export async function getMovie(movieId: string) {
    return await (
        await fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
    ).json();
}

const BASE_IMG_PATH = "https://image.tmdb.org/t/p";
export function getImage(movieId: string, format?: string) {
    return `${BASE_IMG_PATH}/${format ? format : "original"}/${movieId}`;
}

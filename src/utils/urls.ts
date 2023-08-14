const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const apiUrls = {
    popular(currentPage: number) {
        return `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${currentPage}`
    },
    trending() {
        return `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
    },
    upcoming(currentPage: number) {
        return `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${currentPage}`
    },
    playing(currentPage: number) {
        return `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${currentPage}`
    },
};

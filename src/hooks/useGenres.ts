import { useEffect, useState } from "react";

interface genre {
    id: number;
    name: string;
}
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const useGenres = () => {
    const [genres, setGenres] = useState<genre[]>([]);

    const getGenre = async () => {
        await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        )
            .then((response) => response.json())
            .then((data) => {
                setGenres(data.genres);
            })
            .catch((error) => {
                console.log({ genre_error: error });
                setGenres([]);
            });
    };

    useEffect(() => {
        getGenre();
    }, []);

    return { genres }
}
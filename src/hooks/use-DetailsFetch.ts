import { useEffect, useState } from "react";

const cache: {
  [key: string]: { [key: string]: string };
} = {};

export const useDetailsFetch = (searchParam: string) => {
  const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

  const url = `https://www.omdbapi.com/?t=${searchParam}&apikey=${API_KEY}`;


  const [details, setDetails] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<unknown>("");

  const getMoviesDetails = async () => {
    if (cache[url]) {
      const data = cache[url];
      setIsLoading(false);
      setDetails(data);
    } else {
      await fetch(url, { cache: "no-cache" })
        .then((response) => response.json())
        .then((data) => {
          cache[url] = data;
          setIsLoading(false);
          setDetails(data);
        })
        .catch((error) => {
          setIsError(true);
          setError(error);
        });
    }
  };

  useEffect(() => {
    if (searchParam) {
      getMoviesDetails();
    }
  }, [searchParam]);

  return { details, isError, error, isLoading };
};

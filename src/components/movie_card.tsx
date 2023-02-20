import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./card.module.css";
import Error from "./error";

const Card = ({ title, filter }: { title: string; filter?: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<unknown>("");

  const { query, pathname } = useRouter();
  const titleFromUrl = query.title as string;

  // preserving the movie title on refresh
  let searchParam = title === undefined ? titleFromUrl : title;

  const [details, setDetails] = useState<{ [key: string]: string }>({});
  const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

  const getMoviesDetails = () => {
    fetch(`https://www.omdbapi.com/?t=${searchParam}&apikey=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setDetails(data);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      });
  };

  useEffect(() => {
    if (searchParam) {
      getMoviesDetails();
    }
  }, [searchParam]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <Error error={error} />;
  }

  // when details of a searched movie can't be found
  if (pathname !== "/" && details.Error === "Movie not found!") {
    return (
      <div>
        <p>Couldnt find movie</p>
      </div>
    );
  }

  // when details of a move acnnot be found but others are available
  if (details.Error === "Movie not found!") {
    return null;
  }

  // when filtering by genre
  if (filter !== undefined && filter.length > 0) {
    return (
      <>
        {details.Genre.includes(filter) ? (
          <CardDetails title={title} details={details} />
        ) : null}
      </>
    );
  }

  // unfiltered list
  return <CardDetails title={title} details={details} />;
};

export default Card;

interface CardDetails {
  title: string;
  details: { [key: string]: string };
}

const CardDetails = ({ title, details }: CardDetails) => {
  const { push } = useRouter();
  return (
    <section onClick={() => push(`/movie/${title}`)} className={styles.card}>
      <h1 className={styles.title}>{title}</h1>
      {details.Poster !== "N/A" ? (
        <div className={styles.poster}>
          <Image
            src={`${details.Poster}`}
            width={100}
            height={100}
            alt={`${title} Poster`}
          />
        </div>
      ) : null}
      <section>
        <p className={styles.plot}>{details.Plot}</p>

        <div className={styles.details}>
          <p>
            <strong> Released </strong> : {details.Released}
          </p>
          <p>
            <strong>Runtime :</strong> {details.Runtime}
          </p>
          <p>
            <strong>Genre :</strong> {details.Genre}
          </p>
          <p>
            <strong>Language :</strong> {details.Language}
          </p>
        </div>
      </section>

      <div className={styles.extra__details}>
        <p>
          <strong>Actors :</strong> {details.Actors}
        </p>
        <p>
          <strong>Country :</strong> {details.Country}
        </p>
      </div>
    </section>
  );
};

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
    fetch(`https://www.omdbapi.com/?t=${searchParam}&apikey=${API_KEY}`, {
      cache: "no-cache",
    })
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

  /* when details of a searched movie can't be found */
  if (pathname !== "/" && details.Error === "Movie not found!") {
    return (
      <div>
        <p>Couldnt find movie</p>
      </div>
    );
  }

  /* when details of a move acnnot be found but others are available */
  if (details.Error === "Movie not found!") {
    return null;
  }

  /* when filtering by genre */
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
  const { push, pathname } = useRouter();

  /* returns true when on "_site_/movie/{{moviename}}"
   * returns false when on home page ==> "_site_/"
   */
  const moviePage = pathname !== "/";

  return (
    <section
      onClick={() => push(`/movie/${title}`)}
      className={moviePage ? styles.moviePageCard : styles.card}
    >
      <h1 className={styles.title}>{title}</h1>
      <section className={styles.image_and_text}>
        {details.Poster !== "N/A" ? (
          <div className={styles.poster}>
            <Image
              src={`${details.Poster}`}
              width={moviePage ? 300 : 900}
              height={300}
              alt={`${title} Poster`}
              sizes="100vw"
              style={moviePage ? {} : { maxWidth: "100%", height: "auto" }}
            />
          </div>
        ) : null}
        <div className={styles.text}>
          <p className={styles.plot}>{details.Plot}</p>

          <ul className={styles.details}>
            <li>
              <strong> Released </strong> : {details.Released}
            </li>
            <li>
              <strong>Runtime :</strong> {details.Runtime}
            </li>
            <li>
              <strong>Genre :</strong> {details.Genre}
            </li>
            <li>
              <strong>Language :</strong> {details.Language}
            </li>
          </ul>

          <ul className={styles.extra__details}>
            <li>
              <strong>Actors :</strong> {details.Actors}
            </li>
            <li>
              <strong>Country :</strong> {details.Country}
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
};

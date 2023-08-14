import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./card.module.css";
import Error from "./error";
import { useDetailsFetch } from "../hooks/use-DetailsFetch";
import Loader from "./ui/loader";

const Card = ({ title, filter }: { title: string; filter?: string }) => {
  const { query, pathname } = useRouter();
  const titleFromUrl = query.title as string;

  let searchParam = title === undefined ? titleFromUrl : title; // preserving the movie title on refresh
  const { details, isError, error, isLoading } = useDetailsFetch(searchParam);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  /* when details of a searched movie can't be found */
  if (pathname !== "/" && details.Error === "Movie not found!") {
    return (
      <div style={{ display: "grid", placeItems: "center", marginTop: "3rem" }}>
        <p style={{ fontSize: "1.1rem", fontWeight: 600 }}>
          Sorry, couldn&apos;t find &quot;{title}&quot;
        </p>
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
  const posterUnavailable =
    details.Poster === "N/A" || details.Poster === undefined;

  if (details.Plot === undefined) {
    return (
      <div className={styles.card}>
        <p>API Limit Reached, Please try again later or Reload the page.</p>
      </div>
    );
  }

  return (
    <section className={moviePage ? styles.moviePageCard : styles.card}>
      <Link href={`/movie/${title}`}>
        <h1 className={styles.title}>{title}</h1>
      </Link>
      <section className={styles.image_and_text}>
        {!posterUnavailable ? (
          <div
            onClick={() => push(`/movie/${title}`)}
            className={styles.poster}
          >
            <Image
              src={`${details.Poster}`}
              width={moviePage ? 300 : 900}
              height={300}
              alt={title}
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
              <strong>Rating :</strong> {details.Rated}
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

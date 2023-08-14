import React, { useState } from "react";
import { useGenres } from "../hooks/useGenres";
import styles from "./filters.module.css";
import { useFilters } from "@/hooks";

const Filters = () => {
  const {
    genreFilter,
    setGenreFilter,
    releaseDates,
    dateFilter,
    setDateFilter,
  } = useFilters();
  const { genres } = useGenres();

  return (
    <div className={styles.filters}>
      <h3>Filter By:</h3>

      <div>
        <form action="">
          <label htmlFor="genre"></label>
          <select
            name="genre"
            id=""
            value={genreFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setGenreFilter(e.target.value)
            }
          >
            <option value="">Genre</option>
            <option value="">All</option>
            {genres.length > 0
              ? genres.map(({ id, name }) => (
                  <option value={name} key={id}>
                    {name}
                  </option>
                ))
              : null}
          </select>
        </form>

        <form action="">
          <label htmlFor="release"></label>
          <select
            name="release"
            id=""
            value={dateFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setDateFilter(e.target.value);
            }}
          >
            <option value="">Release Date</option>
            <option value="">All</option>
            {releaseDates.length > 0
              ? releaseDates.map((dates, idx) => (
                  <option value={dates} key={idx}>
                    {dates}
                  </option>
                ))
              : null}
          </select>
        </form>
      </div>
    </div>
  );
};

export default Filters;

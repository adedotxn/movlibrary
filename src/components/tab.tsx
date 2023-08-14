import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./tab.module.css";
import Card from "./movie_card";
import Error from "./error";
import Pagination from "./ui/pagination";
import { useTabFetch } from "../hooks/use-TabFetch";
import { useFilters, useTabs } from "@/hooks";

interface TabInterface {
  tabName: string;
  url: string;
}

const Tab = (props: TabInterface) => {
  const { tabName, url } = props;
  const { genreFilter, dateFilter, setReleaseDates: setDates } = useFilters();
  const { currentPage, setCurrentPage } = useTabs();

  const paginationIsNeeded =
    currentPage !== undefined && setCurrentPage !== undefined;

  const { tab, isError, pages, error } = useTabFetch(
    url,
    currentPage!,
    setCurrentPage!,
    setDates
  );

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <>
      <div className={styles.tabs}>
        <h2>{tabName}</h2>

        <div className={styles.card}>
          {tab.length > 0 ? (
            <section className={styles.cards}>
              {/** Conditionally showing movies when filtered by date and unfiltered */}
              {dateFilter.trim().length === 0
                ? tab.map((movie) => (
                    <Card
                      filter={genreFilter}
                      key={movie.id}
                      title={movie.title}
                    />
                  ))
                : tab
                    .filter((date) => {
                      if (date.release_date === dateFilter) {
                        return tab;
                      }
                    })
                    .map((movie) => (
                      <Card
                        filter={genreFilter}
                        key={movie.id}
                        title={movie.title}
                      />
                    ))}
            </section>
          ) : // <p>loading</p>
          null}
        </div>
      </div>

      {paginationIsNeeded ? (
        <Pagination
          pages={pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
    </>
  );
};

export default Tab;

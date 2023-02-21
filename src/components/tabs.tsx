import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./tabs.module.css";
import Card from "./movie_card";
import Error from "./error";
import Pagination from "./ui/pagination";

interface TabInterface {
  tabName: string;
  url: string;
  genreFilter: string;
  setDates: React.Dispatch<React.SetStateAction<string[]>>;
  dateFilter: string;
  currentPage?: number;
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
}

const Tab = ({
  tabName,
  url,
  genreFilter,
  setDates,
  dateFilter,
  currentPage,
  setCurrentPage,
}: TabInterface) => {
  const [tab, setTab] = useState<any[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<unknown>("");
  const [pages, setPages] = useState<number>(1);

  const paginationIsNeeded =
    currentPage !== undefined && setCurrentPage !== undefined;

  const getTabDetails = async () => {
    await fetch(url, { cache: "no-cache" })
      .then((response) => response.json())
      .then((data) => {
        if (paginationIsNeeded) {
          setCurrentPage(data.page);
        }
        setTab(data.results);
        setPages(data.total_pages);
        const dates = data.results.map((data: { release_date: string }) => {
          return data.release_date;
        });
        setDates(dates);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      });
  };

  useEffect(() => {
    getTabDetails();
  }, [currentPage]);

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

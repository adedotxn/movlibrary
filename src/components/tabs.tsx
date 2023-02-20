import { useEffect, useState } from "react";
import styles from "./tabs.module.css";
import Card from "./movie_card";
import Error from "./error";

const Tab = ({
  tabName,
  url,
  genreFilter,
  setDates,
  dateFilter,
}: {
  tabName: string;
  url: string;
  genreFilter: string;
  setDates: React.Dispatch<React.SetStateAction<string[]>>;
  dateFilter: string;
}) => {
  const [tab, setTab] = useState<any[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<unknown>("");

  const getTabDetails = () => {
    fetch(url, { cache: "no-cache" })
      .then((response) => response.json())
      .then((data) => {
        setTab(data.results);
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
  }, []);

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
          ) : (
            <p>loading</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Tab;

import styles from "@/styles/Home.module.css";
import { useEffect, useReducer, useState } from "react";
import Tab from "@/components/tabs";

export default function Home() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  interface genre {
    id: number;
    name: string;
  }
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

  const [tab, setTab] = useState<{ [key: string]: boolean }>({
    popular: true,
    trending: false,
    playing: false,
    upcoming: false,
  });

  const displayPopular = () => {
    setTab({
      popular: true,
      trending: false,
      playing: false,
      upcoming: false,
    });
    setCurrentPage(1);
  };

  const displayTrending = () => {
    setTab({
      popular: false,
      trending: true,
      playing: false,
      upcoming: false,
    });
    setCurrentPage(1);
  };

  const displayPlaying = () => {
    setTab({
      popular: false,
      trending: false,
      playing: true,
      upcoming: false,
    });
    setCurrentPage(1);
  };

  const displayUpcoming = () => {
    setTab({
      popular: false,
      trending: false,
      playing: false,
      upcoming: true,
    });
    setCurrentPage(1);
  };

  const [genreFilter, setGenreFilter] = useState<string>("");
  const [releaseDates, setReleaseDates] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<string>("");

  const [currentPage, setCurrentPage] = useState(1);
  const apiUrls: { [key: string]: string } = {
    popular: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${currentPage}`,
    trending: `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`,
    upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${currentPage}`,
    playing: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${currentPage}`,
  };

  return (
    <>
      <section>
        <ul className={styles.tabsPanel}>
          <li
            onClick={displayPopular}
            className={tab.popular ? styles.active : ""}
          >
            Popular
          </li>
          <li
            onClick={displayTrending}
            className={tab.trending ? styles.active : ""}
          >
            Trending
          </li>
          <li
            onClick={displayUpcoming}
            className={tab.upcoming ? styles.active : ""}
          >
            Upcoming
          </li>
          <li
            onClick={displayPlaying}
            className={tab.playing ? styles.active : ""}
          >
            Now Playing
          </li>
        </ul>

        <div className={styles.filters}>
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
                <option value="">By Genre</option>
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
                <option value="">By Release Date</option>
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
      </section>

      <section className={styles.alltabs}>
        {tab.popular ? (
          <Tab
            tabName="Popular Movies"
            url={apiUrls.popular}
            genreFilter={genreFilter}
            setDates={setReleaseDates}
            dateFilter={dateFilter}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : null}
        {tab.trending ? (
          <Tab
            tabName="Trending Movies"
            url={apiUrls.trending}
            genreFilter={genreFilter}
            setDates={setReleaseDates}
            dateFilter={dateFilter}
          />
        ) : null}
        {tab.upcoming ? (
          <Tab
            tabName="Upcoming movies (in theaters)"
            url={apiUrls.upcoming}
            genreFilter={genreFilter}
            setDates={setReleaseDates}
            dateFilter={dateFilter}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : null}
        {tab.playing ? (
          <Tab
            tabName="NOW PLAYING (in theaters)"
            url={apiUrls.playing}
            genreFilter={genreFilter}
            setDates={setReleaseDates}
            dateFilter={dateFilter}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : null}
      </section>
    </>
  );
}

import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Tab from "@/components/tabs";

export default function Home() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const apiUrls: { [key: string]: string } = {
    popular: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
    trending: `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`,
    upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
    playing: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
  };

  interface genre {
    id: number;
    name: string;
  }
  const [genres, setGenres] = useState<genre[]>([]);

  const getGenre = () => {
    fetch(
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
  };

  const displayTrending = () => {
    setTab({
      popular: false,
      trending: true,
      playing: false,
      upcoming: false,
    });
  };

  const displayPlaying = () => {
    setTab({
      popular: false,
      trending: false,
      playing: true,
      upcoming: false,
    });
  };

  const displayUpcoming = () => {
    setTab({
      popular: false,
      trending: false,
      playing: false,
      upcoming: true,
    });
  };

  const [genreFilter, setGenreFilter] = useState<string>("");
  const [releaseDates, setReleaseDates] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<string>("");

  return (
    <>
      <section>
        <div className={styles.tabsPanel}>
          <p
            onClick={displayPopular}
            className={tab.popular ? styles.active : ""}
          >
            Popular
          </p>
          <p
            onClick={displayTrending}
            className={tab.trending ? styles.active : ""}
          >
            Trending
          </p>
          <p
            onClick={displayUpcoming}
            className={tab.upcoming ? styles.active : ""}
          >
            Upcoming
          </p>
          <p
            onClick={displayPlaying}
            className={tab.playing ? styles.active : ""}
          >
            Now Playing
          </p>
        </div>

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
          />
        ) : null}
        {tab.playing ? (
          <Tab
            tabName="NOW PLAYING (in theaters)"
            url={apiUrls.playing}
            genreFilter={genreFilter}
            setDates={setReleaseDates}
            dateFilter={dateFilter}
          />
        ) : null}
      </section>
    </>
  );
}

import { useEffect, useState } from "react";

const cache: {
  [key: string]: { page: number; results: []; total_pages: number };
} = {};

export const useTabFetch = (
  url: string,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  setDates: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const [tab, setTab] = useState<any[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<unknown>("");
  const [pages, setPages] = useState<number>(1);

  const paginationIsNeeded =
    currentPage !== undefined && setCurrentPage !== undefined;

  const getTabDetails = async () => {
    if (cache[url]) {
      const data = cache[url];
      if (paginationIsNeeded) {
        setCurrentPage(data.page);
      }
      setTab(data.results);
      setPages(data.total_pages);
      const dates = data.results.map((data: { release_date: string }) => {
        return data.release_date;
      });
      setDates(dates);
    } else {
      await fetch(url, { cache: "no-cache" })
        .then((response) => response.json())
        .then((data) => {
          cache[url] = data;
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
    }
  };

  useEffect(() => {
    getTabDetails();
  }, [url]);

  return { tab, isError, error, pages };
};

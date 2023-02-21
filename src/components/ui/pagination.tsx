import React from "react";
import styles from "./pagination.module.css";

const Pagination = ({
  pages,
  currentPage,
  setCurrentPage,
}: {
  pages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const pageNumbers: number[] = [...Array(pages + 1).keys()].slice(1);
  const nextPage = () => {
    if (currentPage !== pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button onClick={previousPage}>Prev</button>

      <p>
        {currentPage} of {pageNumbers[pageNumbers.length - 1]}
      </p>
      <button onClick={nextPage}>Next</button>
    </div>
  );
};

export default Pagination;

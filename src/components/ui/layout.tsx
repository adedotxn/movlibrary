import React, { ReactNode, useState } from "react";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import Head from "next/head";

const Layout = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { push } = useRouter();
  const handleSearch = (event: any) => {
    event.preventDefault();
    push(`/movie/${searchQuery}`);
  };
  return (
    <>
      <Head>
        <title>MovLibrary</title>
        <meta
          name="description"
          content="A web application to search for and view information about movies."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1>movLibrary</h1>

        <form onSubmit={handleSearch}>
          <label htmlFor="search"></label>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            placeholder="Search movies"
          />
          <button type="submit">Search</button>
        </form>
      </header>

      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;

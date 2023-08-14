import React, { ReactNode, useState } from "react";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

const Layout = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { push } = useRouter();
  const handleSearch = (event: any) => {
    event.preventDefault();
    if (searchQuery.trim().length === 0) return;
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
        <h1>
          {" "}
          <Link href="/">MovLibrary 🎬</Link>{" "}
        </h1>

        <form onSubmit={handleSearch}>
          <label htmlFor="search"></label>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            placeholder="Type in a movie title (e.g Barbie)"
          />
          <button type="submit">Search</button>
        </form>
      </header>

      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;

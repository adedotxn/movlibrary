import { apiUrls } from "@/utils/urls";
import { useFilters, useTabs } from "../hooks";
import Tab from "./tab";
import styles from "./tabs.module.css";

const Tabs = () => {
  const { tab, currentPage, setCurrentPage } = useTabs();

  const popular = apiUrls.popular(currentPage);
  const trending = apiUrls.trending();
  const upcoming = apiUrls.upcoming(currentPage);
  const playing = apiUrls.playing(currentPage);

  return (
    <section className={styles.alltabs}>
      {tab.popular ? <Tab tabName="Popular Movies" url={popular} /> : null}
      {tab.trending ? <Tab tabName="Trending Movies" url={trending} /> : null}
      {tab.upcoming ? (
        <Tab tabName="Upcoming movies (in theaters)" url={upcoming} />
      ) : null}
      {tab.playing ? (
        <Tab tabName="NOW PLAYING (in theaters)" url={playing} />
      ) : null}
    </section>
  );
};

export default Tabs;

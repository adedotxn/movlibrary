import styles from "@/styles/Home.module.css";
import { useTabs } from "../hooks";

const TabPanels = () => {
  const { tab, display } = useTabs();

  return (
    <ul className={styles.tabsPanel}>
      <li
        onClick={() => display.popular()}
        className={tab.popular ? styles.active : styles.tabName}
      >
        Popular
      </li>
      <li
        onClick={() => display.trending()}
        className={tab.trending ? styles.active : styles.tabName}
      >
        Trending
      </li>
      <li
        onClick={() => display.upcoming()}
        className={tab.upcoming ? styles.active : styles.tabName}
      >
        Upcoming
      </li>
      <li
        onClick={() => display.playing()}
        className={tab.playing ? styles.active : styles.tabName}
      >
        Now Playing
      </li>
    </ul>
  );
};

export default TabPanels;

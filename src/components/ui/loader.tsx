import styles from "./loader.module.css";

const Loader = () => {
  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <span className={styles.loader}>loader</span>
    </div>
  );
};

export default Loader;

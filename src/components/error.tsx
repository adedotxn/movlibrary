const Error = ({ error }: { error: unknown }) => {
  console.log({ error });
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        marginTop: "5rem",
        fontWeight: 600,
      }}
    >
      Oops, An Error Occured. Reload the page again soon or Check Console
    </div>
  );
};

export default Error;

import Card from "@/components/movie_card";
import { useRouter } from "next/router";

const Movie = () => {
  const { query } = useRouter();
  const title = query.title as string;
  return <Card title={title} />;
};

export default Movie;

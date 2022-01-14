import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useQuery } from "react-query";
import ItemCard from "./components/ItemCard";
import ItemDetail from "./components/ItemDetail";
import { rickAndMorty } from "../../lib/graphql";

interface CharactersData {
  info: { pages: number };
  results: {
    id: string;
    name: string;
    status: string;
    species: string;
  }[];
}

const Main = () => {
  const [pages, setPages] = useState(1);

  const { search } = useLocation();
  const { pageParam = "1" } = useParams();
  const page = +pageParam || 1;
  const params = new URLSearchParams(search);
  const id = params.get("id");

  const { data, status } = useQuery<CharactersData>(
    `characters-${page}`,
    () => {
      return rickAndMorty(`
      query {
        characters(page: ${page}) {
          info { pages }
          results { id name status species }
        }
      }
    `).then((r) => r.characters);
    }
  );

  const characters = data?.results || [];

  useEffect(() => {
    setPages(data?.info?.pages || pages);
  }, [data, pages]);

  if (status === "error") {
    return <div id="app_body"></div>;
  }

  return (
    <div id="app_body">
      <div className="title">
        <Link to={`/${page - 1 || pages}${search}`}>
          <div className="title---arrow left" />
        </Link>
        <div>
          Rick and Morty Characters {page} / {pages}
        </div>
        <Link to={`/${page >= pages ? 1 : page + 1}${search}`}>
          <div className="title---arrow right" />
        </Link>
      </div>
      <div className="list">
        {characters?.map((e, i) => (
          <ItemCard key={i} data={e} />
        ))}
      </div>
      {id && <ItemDetail id={id} />}
    </div>
  );
};

export default Main;
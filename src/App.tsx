import React, { useState, useEffect } from "react";
import {
  useParams,
  useLocation,
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import ItemCard from "./components/ItemCard";
import ItemDetail from "./components/ItemDetail";
import { rickAndMorty } from "./lib/graphql";
import "./App.css";

const queryClient = new QueryClient();

const AppBody = () => {
  const [pages, setPages] = useState(1);

  const { search } = useLocation();
  const { pageParam = "1" } = useParams();
  const page = +pageParam || 1;
  const params = new URLSearchParams(search);
  const id = params.get("id");

  const { data } = useQuery(`characters-${page}`, () => {
    return rickAndMorty(`
      query {
        characters(page: ${page}) {
          info { pages }
          results { id name status species }
        }
      }
    `).then((r) => r.characters);
  });

  const characters = (data?.results as Array<any>) || [];

  useEffect(() => {
    setPages(data?.info?.pages || pages);
  }, [data]);

  return (
    <div>
      {id && <ItemDetail id={id} />}
      <div className="title">
        <Link to={`/${page - 1 || 1}${search}`}>
          <div className="title---arrow left" />
        </Link>
        <div>
          Rick and Morty Characters {page} / {pages}
        </div>
        <Link to={`/${page >= pages ? page : page + 1}${search}`}>
          <div className="title---arrow right" />
        </Link>
      </div>
      <div className="list">
        {characters?.map((e, i) => (
          <ItemCard key={i} data={e} />
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Navigate to="/1" replace />} />
          <Route path="/:pageParam" element={<AppBody />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import { useLocation } from "react-router-dom";
import ItemCard from "./components/ItemCard";
import ItemDetail from "./components/ItemDetail";
import { rickAndMorty } from "./lib/graphql";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const { pathname } = useLocation();
  const path = pathname.substring(1, pathname.length);

  useEffect(() => {
    rickAndMorty(`
      query {
        characters(page: 1, filter: { name: "rick" }) {
          results { id name status species }
        }
      }
    `).then((r) => setCharacters(r?.characters.results));
  }, []);

  return (
    <div className="body">
      {path && <ItemDetail id={path} />}
      <div className="title">Rick and Morty Characters</div>
      <div className="list">
        {characters?.map((e, i) => (
          <ItemCard key={i} data={e} />
        ))}
      </div>
    </div>
  );
};

export default App;

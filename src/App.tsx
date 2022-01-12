import React, { useState, useEffect } from "react";
import "./App.css";
import { rickAndMorty } from "./lib/graphql";
import ItemCard from "./components/ItemCard";

const App = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    rickAndMorty(`
      query {
        characters(page: 2, filter: { name: "rick" }) {
          info { count }
          results { name }
        }
        location(id: 1) { id }
        episodesByIds(ids: [1, 2]) { id }
      }
    `).then((r) => setCharacters(r?.characters.results));
  }, []);

  return (
    <div>
      {characters?.map((e, i) => (
        <ItemCard key={i} data={e} />
      ))}
    </div>
  );
};

export default App;

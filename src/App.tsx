import React, { useState, useEffect } from "react";
import "./App.css";
import { rickAndMorty } from "./lib/graphql";
import ItemCard from "./components/ItemCard";

const App = () => {
  const [characters, setCharacters] = useState([]);

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

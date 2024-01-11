import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function loadDecks() {
      try {
        const decksData = await listDecks();
        setDecks(decksData);
      } catch (error) {
        console.error("Error loading decks:", error);
      }
    }
    loadDecks();
  }, []);

  const handleDeleteDeck = async (deckId) => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      try {
        await deleteDeck(deckId);
        setDecks(decks.filter((deck) => deck.id !== deckId));
      } catch (error) {
        console.error("Error deleting deck:", error);
      }
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <Link to="/decks/new">
        <button>Create Deck</button>
          </Link>
      <ul>
        {decks.map((deck) => (
          <li key={deck.id}>
            <p>{deck.name}</p>
            <p>{deck.cards.length} cards</p>
            <Link to={`/decks/${deck.id}/study`}>
                <button>Study</button>
            </Link>
            <Link to={`/decks/${deck.id}`}>
                <button>View</button>
                </Link>
            <button onClick={() => handleDeleteDeck(deck.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
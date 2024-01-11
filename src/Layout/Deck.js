import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteCard } from "../utils/api";

function Deck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    async function loadDeck() {
      try {
        const deckData = await readDeck(deckId);
        setDeck(deckData);
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    }

    loadDeck();
  }, [deckId]);

  const handleDeleteCard = async (cardId) => {
    try {
      // Delete the card using the deleteCard function
      await deleteCard(cardId);

      // Refresh the deck data after deleting the card
      const updatedDeck = await readDeck(deckId);
      setDeck(updatedDeck);
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  if (!deck) {
    return <p>Loading...</p>;
  }

  const { name, description, cards } = deck;

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> /  {deck.name} 
      </nav>
      <h1>{name}</h1>
      <p>{description}</p>

      <div>
        <Link to={`/decks/${deckId}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to={`/decks/${deckId}/study`}>
          <button>Study</button>
        </Link>
        <Link to={`/decks/${deckId}/cards/new`}>
          <button>Add Cards</button>
        </Link>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this deck?")) {
              // Implement the deleteDeck function and redirect to Home
              // deleteDeck(deckId);
              history.push("/");
            }
          }}
        >
          Delete
        </button>
      </div>

      <h2>Cards</h2>
      <ul>
        {cards.map((card) => (
          <li key={card.id}>
            <p>{card.front}</p>
            <p>{card.back}</p>
            <div>
              <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
                <button>Edit Card</button>
              </Link>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this card?")) {
                    // Implement the deleteCard function and refresh the page
                    // deleteCard(card.id);
                    handleDeleteCard(card.id);
                  }
                }}
              >
                Delete Card
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Deck;

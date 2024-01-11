import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, readCard } from "../utils/api";
import AddCard from "./AddCard";

function Study() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    async function loadDeckAndCard() {
      try {
        const deckData = await readDeck(deckId);
        setDeck(deckData);

        if (deckData.cards && deckData.cards[currentIndex]) {
          const cardId = deckData.cards[currentIndex].id;
          const cardData = await readCard(cardId);
          // Do something with the cardData if needed
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }
    loadDeckAndCard();
  }, [deckId, currentIndex]);

  const handleFlip = () => {
    setFlipped(!flipped);
    
  };

  const handleNext = () => {
    if (currentIndex < deck.cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    } else {
      if (window.confirm("Do you want to restart the deck?")) {
        setCurrentIndex(0);
        setFlipped(false);
      } else {
        history.push("/");
      }
    }
  };

  if (!deck) {
    return <p>Loading...</p>;
  }

  const currentCard = deck.cards[currentIndex];

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> / <Link to="/decks/:deckId">{deck.name} </Link> /  Study 
      </nav>
      <h1>Study: {deck.name}</h1>
      {deck.cards.length < 3 ? (
        <div>
          <h2>Not enough cards.</h2>
          <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck</p>
          <Link to={`/decks/${deckId}/cards/new`}>
            <button>Add Card</button>
          </Link>
        </div>
      ) : (
        <div>
          <div>
            <p>
              Card {currentIndex + 1} of {deck.cards.length}
            </p>
            {flipped ? (
              <p>{currentCard.back}</p>
              
            ) : (
              <p>{currentCard.front}</p>
            )}
          </div>
          <button onClick={handleFlip}>Flip</button>
          {flipped && (
            <button onClick={handleNext}>
              {currentIndex === deck.cards.length - 1 ? "Restart" : "Next"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Study;
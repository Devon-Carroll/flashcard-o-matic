import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readCard, updateCard, readDeck } from "../utils/api";
import Form from "./Form";

function EditCard() {
  const history = useHistory();
  const { cardId, deckId } = useParams();
  const [card, setCard] = useState(null);
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
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

  useEffect(() => {
    async function loadCard() {
      try {
        const cardData = await readCard(cardId);
        setCard(cardData);
        setCardFront(cardData.front);
        setCardBack(cardData.back);

        
      } catch (error) {
        console.error("Error loading card:", error);
      }
    }
    loadCard();
  }, [cardId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const updatedCard = await updateCard({
            id: cardId,
            front: cardFront,
            back: cardBack,
            deckId: deckId,
        });
        console.log("Card updated:", updatedCard);
        history.push(`/decks/${card.deckId}`);
    } catch (error) {
        console.error("Error updating card:", error);
    }
  };

  const handleDone = () => {
    history.push(`/decks/${card.deckId}`);
  }

  if (!card) {
    return <p>Loading...</p>;
  }

  const fields = [
    {
      name: "front",
      label: "Front",
      type: "textarea",
      placeholder: "Front side of card",
      value: cardFront,
      onChange: (event) => setCardFront(event.target.value),
    },
    {
      name: "back",
      label: "Back",
      type: "textarea",
      placeholder: "Back side of card",
      value: cardBack,
      onChange: (event) => setCardBack(event.target.value),
    },
  ];

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> / <Link to={`/decks/${deckId}`}>{deck.name}</Link> /{" "}
        <span>Edit Card {cardId}</span>
      </nav>
      <h2>{deck.name}: Edit Card</h2>
      <Form fields={fields} handleSubmit={handleSubmit} handleDone={handleDone} />
    </div>
  );
}

export default EditCard;

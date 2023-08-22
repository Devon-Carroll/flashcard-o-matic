import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readCard, updateCard } from "../utils/api";

function EditCard() {
  const history = useHistory();
  const { cardId } = useParams();
  const [card, setCard] = useState(null);
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");

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
            deckId: card.deckId,
        });
        console.log("Card updated:", updatedCard);
        history.push(`/decks/${card.deckId}`);
    } catch (error) {
        console.error("Error updating card:", error);
    }
  };

  const handleCancel = () => {
    history.push(`/decks/${card.deckId}`);
  }

  if (!card) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <nav>
          <Link to="/">Home</Link> / Edit Card 
        </nav>
        <h1>Edit Card</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="front">Front</label>
                <br />
                <textarea
                id="front"
                type="textarea"
                name="front"
                placeholder="Front of the card"
                value={cardFront}
                onChange={(event) => setCardFront(event.target.value)}
                ></textarea>
            </div>
            <div>
                <label htmlFor="back">Back</label>
                <br />
                <textarea
                id="back"
                type="textarea"
                name="back"
                placeholder="Back of the card"
                value={cardBack}
                onChange={(event) => setCardBack(event.target.value)}
                ></textarea>
            </div>
            <div>
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </form>
    </div>
  );
}

export default EditCard;

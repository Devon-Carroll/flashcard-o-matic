import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import Form from "./Form";


function AddCard({cards, setCards }) {
    const history = useHistory();
    const { deckId } = useParams();
    const [deck, setDeck] = useState(null);
    const [cardFront, setCardFront] = useState("");
    const [cardBack, setCardBack] = useState("");

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const newCard = await createCard(deckId, { front: cardFront, back: cardBack });
            console.log("New card created:", newCard);
            setCards(currentCards => [...currentCards, newCard]);
            setCardFront("");
            setCardBack("");
            
        } catch (error) {
            console.error("Error creating card:", error);
        }
    };

    const handleDone = () => {
        history.push(`/decks/${deckId}`);
    };

    if (!deck) {
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
            <span>Add Card</span>
          </nav>
          <h2>{deck.name}: Add Card</h2>
          <Form fields={fields} handleSubmit={handleSubmit} handleDone={handleDone} />
        </div>
      );
    }
    
    export default AddCard;
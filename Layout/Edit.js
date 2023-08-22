import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import Form from "./Form";

function EditDeck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");

  useEffect(() => {
    async function loadDeck() {
      try {
        const deckData = await readDeck(deckId);
        setDeck(deckData);
        setDeckName(deckData.name);
        setDeckDescription(deckData.description);
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    }

    loadDeck();
  }, [deckId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedDeck = await updateDeck({
        id: deckId,
        name: deckName,
        description: deckDescription,
      });
      console.log("Deck updated:", updatedDeck);
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error updating deck:", error);
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
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Deck Name",
      value: deckName,
      onChange: (event) => setDeckName(event.target.value),
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Brief description of the deck",
      value: deckDescription,
      onChange: (event) => setDeckDescription(event.target.value),
    },
  ];

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> / Edit Deck
      </nav>
      <h1>Edit Deck</h1>
      <Form fields={fields} handleSubmit={handleSubmit} handleDone={handleDone} />
    </div>
  );
}

export default EditDeck;
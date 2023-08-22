import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
  const history = useHistory();
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newDeck = await createDeck({ name: deckName, description: deckDescription });
      console.log("New deck created:", newDeck);
      // Store the deck name in session storage
      sessionStorage.setItem("newDeckName", deckName);
      history.push(`/decks/${newDeck.id}`); // Navigate to the new deck's detail page
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> / Create Deck
      </nav>
      <h1>Create Deck</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Deck Name"
            value={deckName}
            onChange={(event) => setDeckName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <br />
          <textarea
            id="description"
            name="description"
            placeholder="Brief description of the deck"
            value={deckDescription}
            onChange={(event) => setDeckDescription(event.target.value)}
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

export default CreateDeck;
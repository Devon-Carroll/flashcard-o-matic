// DeckContainer.js
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Deck from "./Deck";
import AddCard from "./AddCard";
import Study from "./Study";

function DeckContainer() {
  const [cards, setCards] = useState([]);

  return (
    <Switch>
      <Route path="/decks/:deckId/add-card">
        <AddCard cards={cards} setCards={setCards} />
      </Route>
      <Route path="/decks/:deckId/study">
        <Study cards={cards} />
      </Route>
      <Route path="/decks/:deckId">
        <Deck cards={cards} />
      </Route>
    </Switch>
  );
}

export default DeckContainer;

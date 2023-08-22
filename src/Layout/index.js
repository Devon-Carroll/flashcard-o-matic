import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import { Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import BreadCrumb from "./BreadCrumb";
import Edit from "./Edit";
import Study from "./Study";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import { readDeck } from "../utils/api";

function Layout() {
  const location = useLocation();
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const deckRoutePath = "/decks/:deckId";
  const newDeckPath = "/decks/new";

  useEffect(() => {
    async function fetchData() {
      try {
        const deckData = await readDeck(deckId);
        setDeck(deckData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }
    fetchData();
  }, [deckId]);

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path={newDeckPath} component={CreateDeck} />
          <Route exact path="/decks/:deckId" >
            <Deck  />
          </Route>
          <Route exact path="/decks/:deckId/edit" component={Edit} />
          <Route exact path="/decks/:deckId/study">
            <Study  />
          </Route>
          <Route exact path="/decks/:deckId/cards/new" component={AddCard}/>
            
          <Route exact path="/decks/:deckId/cards/:cardId/edit" component={EditCard} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default Layout;



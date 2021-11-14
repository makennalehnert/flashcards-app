import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import {Route, Switch} from 'react-router-dom';
import Home from './Home';
import CreateDeck from '../Content/CreateDeck';
import Study from '../Studying/Study'
import Deck from '../Content/Deck'
import AddCard from '../Content/AddCard'
import EditCard from '../Content/EditCard'
import EditDeck from '../Content/EditDeck'
import { listDecks, API_BASE_URL} from "../utils/api";



function Layout() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {

    const abortController = new AbortController();
    async function loadDecks() {
      try{
        const decksData = await listDecks(abortController.signal)
        setDecks(decksData);

      }catch(error){
        if (error.name !== "AbortError"){
          throw error;
        }
      }
    }
    loadDecks();
    return () => abortController.abort();
  }, [setDecks]);

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
        <Route exact path="/">
          <Home decks={decks} setDecks={setDecks}/>
        </Route>
        {/* TODO: Implement the screen starting here */}
        <Route exact path='/decks/new'>
          <CreateDeck decks={decks} setDecks={setDecks}/>
        </Route>
        <Route exact path='/decks/:deckId/study'>
          <Study decks={decks} setDecks={setDecks}/>
        </Route> 
        <Route exact path="/decks/:deckId">
          <Deck decks={decks} setDecks={setDecks}/>
        </Route>  
        <Route exact path="/decks/:deckId/edit">
          <EditDeck decks={decks} setDecks={setDecks}/>
        </Route>
        <Route exact path="/decks/:deckId/cards/new">
          <AddCard/>
        </Route>  
        <Route exact path="/decks/:deckId/cards/:cardId/edit">
          <EditCard/>
        </Route>
        <Route path="">
        <NotFound />
        </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;

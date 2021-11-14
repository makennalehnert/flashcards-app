import { Link, useParams,useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readDeck, deleteCard, deleteDeck } from "../utils/api/index";

// started working on deck, but need to add delete button functionality

export default function Deck({ decks, setDecks }) {
    
  const initializedState = {
    id: "",
    name: "",
    description: "",
    cards: [],
  };

  const initializedStateCard = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  };

  const [currentIndexDeck, setCurrentIndexDeck] = useState(0);
  const params = useParams();
  const [deck, setDeck] = useState(initializedState);
  const [card, setCard] = useState(initializedStateCard);
  const history = useHistory();
  
  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(params.deckId);
      setDeck(deckFromAPI);
      setCard(deckFromAPI.cards);
      setCurrentIndexDeck(Object.values(params) - 1);
    }
    loadDeck();
  }, [params.deckId, params]);

  async function deleteCardHandler(cardId){
      if(window.confirm("Delete this card? You will not be able to recover it.")) { 
   await deleteCard(cardId)
   const newCards =  deck.cards.filter((card) => card.id !== cardId)
    setDeck({...deck, cards: newCards})
      }else{
          return null;
      }
 }

 async function deleteDeckHandler(deckId){
   await deleteDeck(deckId)
    setDecks((currentDecks) => 
    currentDecks.filter((deck) => deck.id !== deckId)
    )
    history.push("/")
 }
  //edit link not working and neither is delete button

  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">{deck.name}</li>
          </ol>
        </nav>
      </div>

      <div>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary">
          Edit
        </Link>
        <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
          Study
        </Link>
        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
          Add Cards
        </Link>
        <button type="delete" className="btn btn-danger" onClick={() => deleteDeckHandler(deck.id)}>
          Delete
        </button>
        <h2>Cards</h2>
        {deck.cards.map((card, index) => (
          <div className="card">
            <div className="card-body">
              <p className="card-text">{card.front}</p>
              <p className="card-text">{card.back}</p>
              <Link
               to={`/decks/${deck.id}/cards/${card.id}/edit`}
                className="btn btn-secondary"
              >
                Edit
              </Link>
              <button type="delete" className="btn btn-danger" onClick={() => deleteCardHandler(card.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

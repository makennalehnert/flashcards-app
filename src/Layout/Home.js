import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api/index";

export default function Home({ decks, setDecks }) {
  function deleteHandler(deckId) {
    deleteDeck(deckId);
    setDecks((currentDecks) =>
      currentDecks.filter((deck) => deck.id !== deckId)
    );
  }

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
      try {
        const decksData = await listDecks(abortController.signal);
        setDecks(decksData);
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
    loadDecks();
    return () => abortController.abort();
  }, []);

  return (
    <div>
      <Link to="/decks/new">
        <button type="button" className="btn btn-secondary">
          Create Deck +
        </button>
      </Link>
      {decks.map((deck, index) => (
        <div className="card w-75 mx-auto">
          <div className="card-body">
            <h5 className="card-title">{deck.name}</h5>
            <p className="card-text">{deck.description}</p>
            <p class="card-text"><small class="text-muted">{deck.cards.length} cards</small></p>
            <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
              View
            </Link>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
              Study
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => deleteHandler(deck.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
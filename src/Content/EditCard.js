import { createDeck, readDeck, readCard,updateCard } from "../utils/api";
import { useParams, Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function EditCard() {

    const initializedCardState = {
        id: "",
        front: "",
        back: "",
        deckId: "",
      };

    const initializedDeckState = {
        id: "",
        name: "",
        description: "",
        cards: [],
      };

  const history = useHistory();
  const params = useParams();
  const [card, setCard] = useState(initializedCardState);
  const [deck, setDeck] = useState(initializedDeckState);

  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(params.deckId);
      setDeck(deckFromAPI);
    }
    loadDeck();
  }, [params.deckId]);

  useEffect(() => {
    async function loadCard() {
      const cardFromAPI = await readCard(params.cardId);
      setCard(cardFromAPI);
    }
    loadCard();
  }, [params.cardId]);



  function handleChange({target}){
    setCard({
      ...card,
      [target.name]: target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault()
    await updateCard(card);
    history.push(`/decks/${deck.id}`)
  }

  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">Deck {deck.name}</li>
            <li className="breadcrumb-item">Edit Card {card.id}</li>
          </ol>
        </nav>
      </div>

      <div>
        <h1>Edit Card</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="front">Front</label>
            <textarea
              type="text"
              className="form-control"
              id="front"
              rows="3"
              name="front"
              placeholder={card.front}
              onChange={handleChange}
              value={card.front}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="back">Back</label>
            <textarea
              className="form-control"
              id="back"
              placeholder={card.back}
              rows="3"
              name="back"
              onChange={handleChange}
              value={card.back}
            ></textarea>
          </div>
          <button
            type="cancel"
            className="btn btn-secondary"
            onClick={() => history.push(`/decks/${params.deckId}`)}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

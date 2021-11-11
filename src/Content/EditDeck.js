import { Link, useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readDeck, updateDeck } from "../utils/api/index";


export default function EditDeck({ decks, setDecks }) {
    const initializedState = {
        id: "",
        name: "",
        description: "",
        cards: [],
      };

    
      const params = useParams();
      const [deck, setDeck] = useState(initializedState);
      let history = useHistory()
    
      
      useEffect(() => {
        async function loadDeck() {
          const deckFromAPI = await readDeck(params.deckId);
          setDeck(deckFromAPI);
        };
        loadDeck();
      }, [params.deckId]);

      function handleChange({target}){
        setDeck({
          ...deck,
          [target.name]: target.value,
        });
      };
    
      async function handleSubmit(event) {
        event.preventDefault()
        await updateDeck(deck);
        history.push(`/decks/${deck.id}`)
      }

  return (
      <>
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">{deck.name}</li>
          <li className="breadcrumb-item">Edit Deck</li>
        </ol>
      </nav>
    </div>

<div>
<h1>Edit Deck</h1>
<form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="name">Name</label>
    <input
      type="text"
      className="form-control"
      id="name"
      name="name"
      placeholder={deck.name}
      onChange={handleChange}
      value={deck.name}
    />
  </div>
  <div className="form-group">
    <label htmlFor="description">Description</label>
    <textarea
      className="form-control"
      id="description"
      placeholder="Brief Description of the Deck"
      rows="3"
      name="description"
      onChange={handleChange}
      value={deck.description}
    ></textarea>
  </div>
  <button
    type="cancel"
    className="btn btn-secondary"
    onClick={() => history.push("/")}
  >
    Cancel
  </button>
 <button type="submit" className="btn btn-primary">
    Submit
  </button>
</form>

</div>



</>
  );
}
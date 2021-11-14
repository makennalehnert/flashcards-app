import {Link, useParams, useHistory} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {readDeck, createCard} from '../utils/api/index'


export default function AddCard() {

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
    


    const params = useParams();
    const [deck, setDeck] = useState(initializedDeckState);
    const [card, setCard] = useState(initializedCardState)
    let history = useHistory();

    useEffect(() => {
        async function loadDeck() {
          const deckFromAPI = await readDeck(params.deckId);
          setDeck(deckFromAPI);
        };
        loadDeck();
      }, [params.deckId]);

    function handleChange({target}){
        setCard({
          ...card,
          [target.name]: target.value
        })
      }
    
    async function handleSubmit(event) {
        event.preventDefault();
        await createCard(params.deckId, card);
        setCard(initializedCardState)
      }

  return (
      <>
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">{deck.name}</li>
            <li className="breadcrumb-item">Add Card</li>
          </ol>
        </nav>
      </div>
    </div>

<div>
<h1>{deck.name}: Add Card</h1>
<form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="front">Front</label>
    <textarea
      type="text"
      className="form-control"
      id="front"
      rows="3"
      name="front"
      placeholder="Front side of card"
      onChange={handleChange}
      value={card.front}
    ></textarea>
  </div>
  <div className="form-group">
    <label htmlFor="back">Back</label>
    <textarea
      className="form-control"
      id="back"
      placeholder="Back side of card"
      rows="3"
      name="back"
      onChange={handleChange}
      value={card.back}
    ></textarea>
  </div>
  <button
    type="done"
    className="btn btn-secondary"
    onClick={() => history.push(`/decks/${params.deckId}`)}
  >
    Done
  </button>
 <button type="submit" className="btn btn-primary">
    Submit
  </button>
</form>

</div>
</>
  );
}

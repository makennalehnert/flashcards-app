import Nav from "./Nav";
import NotEnough from "./NotEnough";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { readDeck } from "../utils/api/index";

export default function Study({ decks }) {
  let history = useHistory();
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

  const params = useParams();
  const [deck, setDeck] = useState(initializedState);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [card, setCard] = useState(initializedStateCard);
  const [front, setFront] = useState("front");

  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(params.deckId);
      setDeck(deckFromAPI);
    }
    loadDeck();
  }, [params.deckId]);

  function flipHandler() {
    if (front == "front") {
      setFront("back");
    } else if (front == "back") {
      setFront("front");
    }
  }

  // !! added the setFront("front")
  function nextHandler() {
    setCurrentIndex(currentIndex + 1);
    setFront("front");
    if (currentIndex === deck.cards.length - 1) {
      window.confirm("Restart cards?") ? setCurrentIndex(0) : history.push("/");
    }
  }
  if (deck.cards.length < 3) {
    return (
      <>
        <Nav deck={deck} />
        <h1>Study: {deck.name}</h1>
        <NotEnough deck={deck} />
      </>
    );
  }

// !! added the { front == "back && "}

  return (
    <div>
      <Nav deck={deck} />
      <h1>Study: {deck.name}</h1>
      <div className="card w-75">
        <div className="card-body">
          <h5 className="card-title">
            Card {currentIndex + 1} of {deck.cards.length}
          </h5>
          <p className="card-text">{deck.cards[currentIndex]?.[front]}</p>
          <button className="btn btn-secondary" onClick={flipHandler}>
            Flip
          </button>
          {front == "back" && 
          <button className="btn btn-primary" onClick={nextHandler}>
            Next
          </button>
          }
        </div>
      </div>
    </div>
  );

}

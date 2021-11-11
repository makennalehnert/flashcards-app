import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

 
export default function NotEnough({deck}){

return (
    <>
    <div>
    <h1>Not enough cards.</h1>
    <p>You need at least 3 cards to study. There are only {deck.cards.length} cards in this deck.</p>
    </div>
    <div>
        <Link to={`/decks/${deck.id}/cards/new`}><button type="button" className="btn btn-primary">Add Cards</button></Link>
    </div>
    </>
)
}
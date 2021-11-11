import React from "react";
import {Link} from 'react-router-dom' 

export default function Nav({deck}) {

  return (
  <>
  <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
          <li className="breadcrumb-item">{deck.name}</li>
          <li className="breadcrumb-item active" aria-current="page">Study</li>
      </ol>
  </nav>
  </>
  );

}

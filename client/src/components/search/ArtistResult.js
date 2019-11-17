import React from 'react';
  
const ArtistResult = ({ artist }) => (
  <span className="spotitalk--search-container">
    <a className="text-white" href={`/artists/${artist.id}`}>
      <img src={artist.image} style={{width: '300px', height: '300px'}} alt={artist.name}/>
      <div className="spotitalk--search-text">
        <h5>{artist.name}</h5>
      </div>
    </a>
  </span>
);

export default ArtistResult;


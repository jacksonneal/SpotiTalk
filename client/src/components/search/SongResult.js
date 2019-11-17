import React from 'react';

const SongResult = ({ song }) => (
  <span className="spotitalk--search-container">
    <a className="text-white" href={`/songs/${song.id}`}>
      <img src={song.image} style={{width: '300px', height: '300px'}} alt={song.name}/>
      <div className="spotitalk--search-text">
        <h5>{song.name}</h5>
        <p>by {song.artist}</p>
      </div>
    </a>
  </span>
);

export default SongResult;


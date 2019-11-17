import React from 'react';

const AlbumResult = ({ album }) => (
  <span className="spotitalk--search-container">
    <a className="text-white" href={`/albums/${album.id}`}>
      <img src={album.image} style={{width: '300px', height: '300px'}} alt={album.name}/>
      <div className="spotitalk--search-text">
        <h5>{album.name}</h5>
        <p>by {album.artist}</p>
      </div>
    </a>
  </span>
);

export default AlbumResult;


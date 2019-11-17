import React from 'react';

const AlbumWidget = ({id}) => (
  <div>
    <iframe
      src={`https://open.spotify.com/embed/album/${id}`}
      title='Spotify player'
      width="300"
      height="300"
      frameBorder="0"
      allowtransparency="true"
      allow="encrypted-media">
    </iframe>
  </div>
);

export default AlbumWidget;

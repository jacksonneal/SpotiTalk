import React from 'react';

const PlayButton = ({id}) => (
  <div>
    <iframe
      src={`https://open.spotify.com/embed/track/${id}`}
      title='Spotify player'
      width="300"
      height="80"
      frameBorder="0"
      allowtransparency="true"
      allow="encrypted-media">
    </iframe>
  </div>
);

export default PlayButton;

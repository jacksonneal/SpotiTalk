import React from 'react';

const PlayButton = ({id}) => (
  <iframe
    src={`https://open.spotify.com/embed/track/${id}`}
    width="300"
    height="80"
    frameborder="0"
    allowtransparency="true"
    allow="encrypted-media">
  </iframe>
);

export default PlayButton;

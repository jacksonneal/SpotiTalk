import React from 'react';

const ArtistWidget = ({ id }) => (
  <div>
    <iframe
      src={`https://open.spotify.com/follow/1/?uri=spotify:artist:${id}&size=detail&theme=dark`}
      width="220"
      height="56"
      title="Artist"
      scrolling="no"
      frameBorder="0"
      style={{ border: 'none', overflow: 'hidden' }}
      allowtransparency="true">
    </iframe>
  </div>
);

export default ArtistWidget;

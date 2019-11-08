import React from 'react';

export default function SongSoloView(props) {
  const { id, title, artist, album, artwork } = props.location.state;

  return (
    <>
      <div id={id}>
        {`${title} by ${artist} off the album ${album}`}
      </div>
      <img alt='album' src={artwork} />
    </>
  );
};
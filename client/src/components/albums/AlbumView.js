import React from 'react';
import AlbumWidget from './AlbumWidget.js';

class AlbumView extends React.Component {
  state = {
    album: null
  }

  componentDidMount() {
    const { id } = this.props.match.params
    fetch(`/api/albums/${id}`)
      .then(response => response.json())
      .then(album => {
        this.setState(() => ({ album }))
      });
  }

  render() {
    const { album } = this.state;
    return album === null ?
      (<p>Loading...</p>) :
      (
        <div>
          <h1>{album.name}</h1>

          <p>By</p>
          {album.artists.map(artist =>
            <p><a className='spotitalk--link' href={`/artists/${artist.id}`}>{artist.name}</a></p>
          )}

          <img className='mb-4' src={album.image} style={{height: '300px', width: '300px'}} alt={album.name} />
          <AlbumWidget id={album.id} />
          <p className='mt-3'>
            <a className='spotitalk--link' href={`/search/${album.name}`}>Search for this album</a>
          </p>
          <a href='/' className='text-secondary'>Return to home</a>
        </div>
      )
  }
}

export default AlbumView;


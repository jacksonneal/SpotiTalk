import React from 'react';
import SongWidget from './SongWidget.js';

class SongView extends React.Component {
  state = {
    song: null
  }

  componentDidMount() {
    const { id } = this.props.match.params
    fetch(`/api/songs/${id}`)
      .then(response => response.json())
      .then(song => {
        this.setState(() => ({ song }))
      });
  }

  render() {
    const { song } = this.state;
    return song === null ?
      (<p>Loading...</p>) :
      (
        <div>
          <h1>{song.name}</h1>

          <p>By</p>
          {song.artists.map(artist =>
            <p><a className='spotitalk--link' href={`/artists/${artist.id}`}>{artist.name}</a></p>
          )}

          <img src={song.album.image} style={{height: '300px', width: '300px'}} alt={song.name} />
          <p>Album: <a className='spotitalk--link' href={`/albums/${song.album.id}`}>{song.album.name}</a></p>
          <SongWidget id={song.id} />
          <p className='mt-3'>
            <a className='spotitalk--link' href={`/search/${song.name}`}>Search for this song</a>
          </p>
          <a href='/' className='text-secondary'>Return to home</a>
        </div>
      )
  }
}

export default SongView;


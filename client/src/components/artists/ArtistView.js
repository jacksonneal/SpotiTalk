import React from 'react';
import ArtistWidget from './ArtistWidget.js';

class ArtistView extends React.Component {
  state = {
    artist: null
  }

  componentDidMount() {
    const { id } = this.props.match.params
    fetch(`/api/artists/${id}`)
      .then(response => response.json())
      .then(artist => {
        this.setState(() => ({ artist }))
      });
  }

  render() {
    const { artist } = this.state;
    return artist === null ?
      (<p>Loading...</p>) :
      (
        <div>
          <h1>{artist.name}</h1>
          <img className='mb-4' src={artist.image} style={{height: '300px', width: '300px'}} alt={artist.name} />
          <ArtistWidget id={artist.id} />
          <p className='mt-3'>
            <a className='spotitalk--link' href={`/search/${artist.name}`}>Search for this artist</a>
          </p>
          <a href='/' className='text-secondary'>Return to home</a>
        </div>
      )
  }
}

export default ArtistView;


import React from 'react';
import ArtistWidget from './ArtistWidget.js';
import ForumFooter from '../forum/ForumFooter';

class ArtistView extends React.Component {
  state = {
    artist: null,
    userId: null,
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const { cookies } = this.props;
    const userId = cookies.get("userId");
    fetch(`/api/artists/${id}`)
      .then(response => response.json())
      .then(artist => {
        this.setState(() => ({ artist, userId }))
      });
  }

  render() {
    const { artist } = this.state;
    return artist === null ?
      (<p>Loading...</p>) :
      (
        <>
          <div>
            <h1>{artist.name}</h1>
            <img className='mb-4' src={artist.image} style={{ height: '300px', width: '300px' }} alt={artist.name} />
            <ArtistWidget id={artist.id} />
            <p className='mt-3'>
              <a className='spotitalk--link' href={`/search/${artist.name}`}>Search for related songs, artists, and albums</a>
            </p>
            <p className='mt-3'>
              <a className='spotitalk--link' href={`/search/${artist.uri}`}>Search for forum posts about this artist</a>
            </p>
            <a href='/' className='text-secondary'>Return to home</a>
          </div>
          <ForumFooter {...{ autoImg: this.state.artist.image, spotifyUri: this.state.artist.uri, userId: this.state.userId }}></ForumFooter>
        </>
      )
  }
}

export default ArtistView;


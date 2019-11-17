import React from 'react';
import SongResult from './SongResult.js';
import ArtistResult from './ArtistResult.js';
import AlbumResult from './AlbumResult.js';

class SearchResults extends React.Component {
  state = {
    results: []
  }

  componentDidMount() {
    const criteria = this.props.criteria;
    if (criteria === undefined) {
      return;
    }
    fetch(`/api/search/${criteria}`)
      .then(response => response.json())
      .then(results => {
        this.setState(() => ({ results }))
      });
  }

  render() {
    const { results } = this.state;
    return results.length === 0 ?
      (<p>Search for a song!</p>) :
      (
        <div>
          <h1 className='my-4'>Songs</h1>
          { results.songs.map(song => <SongResult song={song} key={song.id} />) }
          <h1 className='my-4'>Artists</h1>
          { results.artists.map(artist => <ArtistResult artist={artist} key={artist.id} />) }
          <h1 className='my-4'>Albums</h1>
          { results.albums.map(album => <AlbumResult album={album} key={album.id} />) }
          <p className="text-secondary">Only displaying most relevant results</p>
        </div>
      )
  }
}

export default SearchResults;


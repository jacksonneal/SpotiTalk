import React from 'react';
import PlayButton from './PlayButton.js';

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
          <p>By { song.artists.map(artist => artist.name).join(", ") }</p>
          <img src={song.album.image} />
          <p>Album: {song.album.name}</p>
          <PlayButton id={song.id} />
        </div>
      )
  }
}

export default SongView;


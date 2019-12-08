import React from 'react';
import AlbumWidget from './AlbumWidget.js';
import ForumFooter from '../forum/ForumFooter';
import ModerationToggle from '../moderation/ModerationToggle.js';

class AlbumView extends React.Component {
  state = {
    album: null,
    userId: null
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const { cookies } = this.props;
    const userId = cookies.get("userId");
    fetch(`/api/albums/${id}`)
      .then(response => response.json())
      .then(album => {
        this.setState(() => ({ album, userId }))
      });
  }

  render() {
    const { album } = this.state;
    return album === null ?
      (<p>Loading...</p>) :
      (
        <>
          <div>
            <ModerationToggle
              spotifyUri={album.uri}
              userId={this.state.userId}
              isModerator={this.props.cookies.get("isModerator") === '1'}
              spotifyType='album'
            />

            <h1>{album.name}</h1>

            <p>By</p>
            {album.artists.map(artist =>
              <p><a className='spotitalk--link' href={`/artists/${artist.id}`}>{artist.name}</a></p>
            )}

            <img className='mb-4' src={album.image} style={{ height: '300px', width: '300px' }} alt={album.name} />
            <AlbumWidget id={album.id} />
            <p className='mt-3'>
              <a className='spotitalk--link' href={`/search/${album.name}`}>Search for related songs, artists, and albums</a>
            </p>
            <p className='mt-3'>
              <a className='spotitalk--link' href={`/search/${album.uri}`}>Search for forum posts about this album</a>
            </p>
          </div>
          <ForumFooter {...{ autoImg: this.state.album.image, spotifyUri: this.state.album.uri, userId: this.state.userId }}></ForumFooter>
        </>
      )
  }
}

export default AlbumView;


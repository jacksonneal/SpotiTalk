import React from 'react';
import SongWidget from './SongWidget.js';
import ForumFooter from '../forum/ForumFooter';
import postService from '../../services/post';

class SongView extends React.Component {
  state = {
    song: null,
    userId: null
  }

  constructor(props) {
    super(props);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const { cookies } = this.props;
    const userId = cookies.get("userId");
    fetch(`/api/songs/${id}`)
      .then(response => response.json())
      .then(song => {
        this.setState(() => ({ song, userId }))
      });
  }

  createPost = async function (post) {
    const songPost = {
      ...post,
      spotify_uri: this.state.song.uri
    }
    await postService.createPost(songPost);
  }

  render() {
    const { song } = this.state;
    return song === null ?
      (<p>Loading...</p>) :
      (
        <>
          <div>
            <h1>{song.name}</h1>

            <p>By</p>
            {song.artists.map(artist =>
              <p key={artist.id}><a className='spotitalk--link' href={`/artists/${artist.id}`}>{artist.name}</a></p>
            )}

            <img src={song.album.image} style={{ height: '300px', width: '300px' }} alt={song.name} />
            <p>Album: <a className='spotitalk--link' href={`/albums/${song.album.id}`}>{song.album.name}</a></p>
            <SongWidget id={song.id} />
            <p className='mt-3'>
              <a className='spotitalk--link' href={`/search/${song.name}`}>Search for related songs, artists, and albums</a>
            </p>
            <p className='mt-3'>
              <a className='spotitalk--link' href={`/search/${song.uri}`}>Search for forum posts about this song</a>
            </p>
            <a href='/' className='text-secondary'>Return to home</a>
          </div>
          <ForumFooter {...{ autoImg: this.state.song.album.image, createPost: this.createPost, userId: this.state.userId }}></ForumFooter>
        </>
      )
  }
}

export default SongView;


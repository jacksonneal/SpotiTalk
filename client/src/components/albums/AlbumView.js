import React from 'react';
import AlbumWidget from './AlbumWidget.js';
import postService from '../../services/post';
import ForumFooter from '../forum/ForumFooter';

class AlbumView extends React.Component {
  state = {
    album: null,
    userId: null
  }

  constructor(props) {
    super(props);
    this.createPost = this.createPost.bind(this);
  }

  createPost = async function (post) {
    const songPost = {
      ...post,
      spotify_uri: this.state.album.uri
    }
    await postService.createPost(songPost);
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
            <h1>{album.name}</h1>

            <p>By</p>
            {album.artists.map(artist =>
              <p><a className='spotitalk--link' href={`/artists/${artist.id}`}>{artist.name}</a></p>
            )}

            <img className='mb-4' src={album.image} style={{ height: '300px', width: '300px' }} alt={album.name} />
            <AlbumWidget id={album.id} />
            <p className='mt-3'>
              <a className='spotitalk--link' href={`/search/${album.name}`}>Search for this album</a>
            </p>
            <p className='mt-3'>
              <a className='spotitalk--link' href={`/forum/${album.uri}`}>View Album in Forum</a>
            </p>
            <a href='/' className='text-secondary'>Return to home</a>
          </div>
          <ForumFooter {...{ autoImg: this.state.album.image, createPost: this.createPost, userId: this.state.userId }}></ForumFooter>
        </>
      )
  }
}

export default AlbumView;


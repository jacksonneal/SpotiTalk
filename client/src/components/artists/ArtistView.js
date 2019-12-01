import React from 'react';
import ArtistWidget from './ArtistWidget.js';
import postService from '../../services/post';
import ForumFooter from '../forum/ForumFooter';

class ArtistView extends React.Component {
  state = {
    artist: null,
    userId: null,
  }

  constructor(props) {
    super(props);
    this.createPost = this.createPost.bind(this);
  }

  createPost = async function (post) {
    const songPost = {
      ...post,
      spotify_uri: this.state.artist.uri
    }
    await postService.createPost(songPost);
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const { cookies } = this.props;
    const userId = cookies.get("userId");
    fetch(`/api/artists/${id}`)
      .then(response => response.json())
      .then(artist => {
        console.log(artist);
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
              <a className='spotitalk--link' href={`/search/${artist.name}`}>Search for this artist</a>
            </p>
            <p className='mt-3'>
              <a className='spotitalk--link' href={`/forum/${artist.uri}`}>View Artist in Forum</a>
            </p>
            <a href='/' className='text-secondary'>Return to home</a>
          </div>
          <ForumFooter {...{ autoImg: this.state.artist.image, createPost: this.createPost, userId: this.state.userId }}></ForumFooter>
        </>
      )
  }
}

export default ArtistView;


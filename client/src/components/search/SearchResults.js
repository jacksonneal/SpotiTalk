import React, { useState, useEffect } from 'react';
import SongResult from './SongResult.js';
import ArtistResult from './ArtistResult.js';
import AlbumResult from './AlbumResult.js';
import PostResult from './PostResult.js';
import Forum from '../forum/Forum.js';
import postService from '../../services/post';

function SearchResults(props) {
  const { criteria, cookies } = props;
  const [results, setResults] = useState([]);
  useEffect(() => {
    async function getResults() {
      if (criteria === undefined) {
        return;
      }
      const url = `/api/search/${criteria}`;
      const res = await fetch(url)
        .then(response => response.json());
      res.posts = await postService.getPosts(criteria);
      setResults(res);
    }
    getResults();
  }, [criteria])

  return results.length === 0 ?
    (<p>Search for a song, artist, album, or forum post!</p>) :
    (
      <div>
        {results.posts.length === 0 ? (
          <p className='font-italic my-4'>No forum results found</p>
        ) : (
            <div>
              <h1 className='my-4'>Forum Posts</h1>
              {results.posts.map(post => <PostResult post={post} key={post.post_id} />)}
            </div>
          )}

        {results.songs.length === 0 ? (
          <p className='font-italic my-4'>No song results found</p>
        ) : (
            <div>
              <h1 className='my-4'>Songs</h1>
              {results.songs.map(song => <SongResult song={song} key={song.id} />)}
            </div>
          )}

        {results.artists.length === 0 ? (
          <p className='font-italic my-4'>No artist results found</p>
        ) : (
            <div>
              <h1 className='my-4'>Artists</h1>
              {results.artists.map(artist => <ArtistResult artist={artist} key={artist.id} />)}
            </div>
          )}

        {results.albums.length === 0 ? (
          <p className='font-italic my-4'>No album results found</p>
        ) : (
            <div>
              <h1 className='my-4'>Albums</h1>
              {results.albums.map(album => <AlbumResult album={album} key={album.id} />)}
            </div>
          )}

        <p className="text-secondary my-4">Only displaying the most relevant results</p>
      </div>
    )
}

export default SearchResults;


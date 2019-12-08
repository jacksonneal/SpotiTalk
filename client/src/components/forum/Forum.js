import React, { useState, useEffect } from 'react';
import ForumPostList from './ForumPostList';
import postService from '../../services/post';

export default function Forum(props) {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    postService.getPosts('').then(posts => {
      setPostList(posts);
    });
  }, []);

  return (
    <div>
      <h1>Spotitalk: Talk About Music</h1>
      <p>Most recent forum posts</p>
      <p>To make a new post, <a className='spotitalk--link' href='/search'>search for something to post about</a></p>
      <ForumPostList posts={postList} />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import service from '../../services/post';
import ForumPostList from './ForumPostList';
import ForumFooter from './ForumFooter';

export default function Forum(props) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    const comments = await service.getPosts();
    setResults(comments);
  }

  async function createPost(post) {
    await service.createPost(post);
    fetchComments();
  }

  async function deletePost(id) {
    await service.deletePost(id);
    fetchComments();
  }

  return (
    <div>
      <ForumPostList posts={results} deletePost={deletePost}></ForumPostList>
      <ForumFooter {...{ createPost }}></ForumFooter>
    </div>)
}

import React, { useState, useEffect } from 'react';
import service from '../../services/post';
import ForumPostList from './ForumPostList';
import ForumFooter from './ForumFooter';

export default function Forum(props) {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const comments = await service.getPosts();
    setPostList(comments);
  }

  async function createPost(post) {
    const posts = await service.createPost(post);
    setPostList(posts);
  }

  async function deletePost(id) {
    await service.deletePost(id);
    const posts = await service.getPosts();
    setPostList(posts);
  }

  return (
    <div>
      <ForumPostList posts={postList} deletePost={deletePost}></ForumPostList>
      <ForumFooter {...{ createPost }}></ForumFooter>
    </div>)
}

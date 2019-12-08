import React, { useState, useEffect } from 'react';
import service from '../../services/post';
import ForumPostList from './ForumPostList';
import ForumFooter from './ForumFooter';
import postService from '../../services/post';

export default function Forum(props) {
  const { cookies, results, criteria } = props;
  const [postList, setPostList] = useState(props.results);
  const userId = cookies.get("userId");
  const isModerator = cookies.get("isModerator");

  useEffect(() => {
    async function getResults() {
      const posts = await postService.getPosts('');
      setPostList(posts);
    }
    getResults();
  }, []);

  async function fetchPosts() {
    const comments = await service.getPosts(criteria);
    setPostList(comments);
  }
  async function createPost(post) {
    await service.createPost(post);
    fetchPosts();
  }

  async function deletePost(id) {
    await service.deletePost(id);
    fetchPosts();
  }

  return (
    <div>
      <h1>Spotitalk: Talk About Music</h1>
      <p>Most recent forum posts</p>
      <p>To make a new post, <a className='spotitalk--link' href='/search'>search for something to post about</a></p>
      <ForumPostList userId={userId} isModerator={isModerator} posts={postList} deletePost={deletePost}></ForumPostList>
    </div>)
}

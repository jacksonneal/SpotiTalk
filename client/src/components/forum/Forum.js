import React, { useState, useEffect } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ForumPostList from './ForumPostList';
import postService from '../../services/post';

export default function Forum(props) {
  const { cookies } = props;
  const userId = cookies.get("userId");
  const isModerator = cookies.get("isModerator");
  const [commentedPosts, setCommentedPosts] = useState([]);
  const [postList, setPostList] = useState([]);
  const [key, setKey] = useState('commentedPosts');

  useEffect(() => {
    postService.getPosts('').then(posts => {
      setPostList(posts);
    });
    if (userId && isModerator !== "1") {
      postService.getCommentedPosts(userId).then(posts => {
        setCommentedPosts(posts);
      })
    }
  }, []);

  return (
    <div>
      <h1>Spotitalk: Talk About Music</h1>
      <p>Most recent forum posts</p>
      <p>To make a new post, <a className='spotitalk--link' href='/search'>search for something to post about</a></p>
      {(commentedPosts.length > 0) && (
        <>
          <Tabs id="post-tabs" activeKey={key} onSelect={k => setKey(k)}>
            <Tab eventKey="commentedPosts" title="Posts You've Commented On">
              <ForumPostList posts={commentedPosts} />
            </Tab>
            <Tab eventKey="allPosts" title="All Posts">
              <ForumPostList posts={postList} />
            </Tab>
          </Tabs>
        </>
      )}
      {(commentedPosts.length === 0) && (
        <ForumPostList posts={postList} />
      )}
    </div>
  );
}

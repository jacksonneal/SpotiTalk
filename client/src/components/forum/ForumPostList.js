import React from 'react';
import ForumPost from './ForumPost';

export default function ForumPostList(props) {
    const { posts } = props;
    return (
      <>
        {posts.length === 0 && <div>Loading posts...</div>}
        {posts.length > 0 && posts.map(post => <ForumPost key={post.post_id} {...{ post }}></ForumPost>)}
      </>
    )
}

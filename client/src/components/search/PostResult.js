import React from 'react';

const PostResult = ({ post }) => (
  <span className="spotitalk--search-container">
    <a className="text-white" href={`/forum/${post.post_id}`}>
      <img src={post.img_src} style={{width: '300px', height: '300px'}} alt={post.title}/>
      <div className="spotitalk--search-text">
        <h5>{post.title}</h5>
        <p>by {post.username}</p>
      </div>
    </a>
  </span>
);

export default PostResult;


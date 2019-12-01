import React from 'react';
import ForumPost from './ForumPost';

export default function ForumPostList(props) {
    const { posts, deletePost, isModerator, userId } = props;
    return (
        <>
            {posts.length === 0 && <div>No posts found. Try a different query.</div>}
            {posts.length > 0 && posts.map(post => <ForumPost key={post.post_id} {...{ post, deletePost, isModerator, userId }}></ForumPost>)}
        </>
    )
}
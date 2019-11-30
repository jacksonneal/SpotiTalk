import React from 'react';
import ForumPost from './ForumPost';

export default function ForumPostList(props) {
    const { posts, deletePost } = props;

    return (
        <>
            {posts.map(post => <ForumPost key={post.post_id} {...{ post, deletePost }}></ForumPost>)}
        </>
    )
}
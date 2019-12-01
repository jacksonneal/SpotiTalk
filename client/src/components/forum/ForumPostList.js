import React from 'react';
import ForumPost from './ForumPost';

export default function ForumPostList(props) {
    const { posts, deletePost, isModerator, userId } = props;
    return (
        <>
            {posts.map(post => <ForumPost key={post.post_id} {...{ post, deletePost, isModerator, userId }}></ForumPost>)}
        </>
    )
}
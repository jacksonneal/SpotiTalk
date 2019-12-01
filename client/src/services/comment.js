import { api } from '../config';

async function getComments(postId) {
    const res = await fetch(`${api}/posts/${postId}/comments`);
    return await res.json();
}

async function createComment(postId, userId, content) {
    const post = {
        userId,
        content
    }
    const res = await fetch(`${api}/posts/${postId}/comments`, {
        method: 'post',
        body: JSON.stringify(post),
        headers: {
            'content-type': 'application/json'
        }
    });
    return await res.json();
}

async function deleteComment(commentId) {
    await fetch(`${api}/comments/${commentId}`, {
        method: 'delete',
        headers: {
            'content-type': 'application/json'
        }
    });
}

export default { getComments, createComment, deleteComment }
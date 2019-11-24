import { api } from '../config';

async function getPosts() {
    const res = await fetch(`${api}/comments`);
    return await res.json();
}

async function createPost(post) {
    const res = await fetch(`${api}/comments`, {
        method: 'post',
        body: JSON.stringify(post),
        headers: {
            'content-type': 'application/json'
        }
    });
    return await res.json();
}

async function deletePost(id) {
    await fetch(`${api}/comments/${id}`, {
        method: 'delete',
        headers: {
            'content-type': 'application/json'
        }
    });
}

export default { getPosts, createPost, deletePost }
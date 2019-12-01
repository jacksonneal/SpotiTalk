import { api } from '../config';

async function getPosts(query) {
    if (query === undefined) {
        query = '';
    }
    const res = await fetch(`${api}/posts?query=${query}`);
    return await res.json();
}

async function createPost(post) {
    const res = await fetch(`${api}/posts`, {
        method: 'post',
        body: JSON.stringify(post),
        headers: {
            'content-type': 'application/json'
        }
    });
    return await res.json();
}

async function deletePost(id) {
    await fetch(`${api}/posts/${id}`, {
        method: 'delete',
        headers: {
            'content-type': 'application/json'
        }
    });
}

export default { getPosts, createPost, deletePost }
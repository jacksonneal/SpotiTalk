import { api } from '../config';

async function getModeration(userId) {
    const res = await fetch(`/api/user/${userId}/moderation`)
    return await res.json();
}

async function createModeration(moderation) {
    const res = await fetch(`${api}/moderation`, {
        method: 'post',
        body: JSON.stringify(moderation),
        headers: {
            'content-type': 'application/json'
        }
    });
    return await res.json();
}

async function deleteModeration(id) {
    const res = await fetch(`${api}/moderation/${id}`, {
        method: 'delete',
        headers: {
            'content-type': 'application/json'
        }
    });
    return await res.json();
}

export default { getModeration, createModeration, deleteModeration }

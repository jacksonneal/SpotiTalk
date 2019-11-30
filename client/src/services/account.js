import { api } from '../config';

async function registerUser(user) {
    const res = await fetch(`${api}/user`, {
        method: 'post',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    });
    return await res.json();
};

async function login(userName, password) {
    const res = await fetch(`${api}/user?userName=${userName}&password=${password}`);
    return await res.json();
}

export default { registerUser, login };
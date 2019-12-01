import { api } from '../config';

async function registerUser(user) {
    const res = await fetch(`${api}/user`, {
        method: 'post',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    });
    if (res.status === 200) {
        return "OK";
    } else {
        throw new Error("Unable to register");
    }
};

async function login(userName, password) {
    const res = await fetch(`${api}/user?userName=${userName}&password=${password}`);
    if (res.status === 200) {
        return await res.json();
    } else {
        throw new Error("Unable to login");
    }
}

export default { registerUser, login };
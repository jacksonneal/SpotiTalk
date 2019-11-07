const initialState = {
    songSearchTitle: '',
    songsearchArtist: '',
    authToken: '',
};

const actions = {
    'SEARCH_SONG_TITLE': searchSongTitle,
    'SEARCH_SONG_ARTIST': searchSongArtist,
    'SAVE_AUTH_TOKEN': saveAuthToken,
}

function searchSongTitle(state, action) {
    return {
        ...state,
        songSearchTitle: action.payload.searchTitle
    }
}

function searchSongArtist(state, action) {
    return {
        ...state,
        songsearchArtist: action.payload.searchArtist
    }
}

function saveAuthToken(state, action) {
    return {
        ...state,
        authToken: action.payload.authToken,
    }
}

export default { initialState, actions }
const initialState = {
    songSearchTitle: '',
    songsearchArtist: '',
};

const actions = {
    'SEARCH_SONG_TITLE': searchSongTitle,
    'SEARCH_SONG_ARTIST': searchSongArtist,
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

export default { initialState, actions }
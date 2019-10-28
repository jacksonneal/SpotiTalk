const initialState = {
    songSearchTitle: '',
};

const actions = {
    'SEARCH_SONG_TITLE': searchSongTitle,
}

//Just an example, probably won't delete songs
function searchSongTitle(state, action) {
    return {
        songSearchTitle: action.payload.searchTitle
    }
}

export default { initialState, actions }
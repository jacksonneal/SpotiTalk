const initialState = {
    songList: [], //Would fill from service
};

//Are there any actions?
const actions = {
    'DELETE_SONG': deleteSong,
}

//Just an example, probably won't delete songs
function deleteSong(state, action) {
    return {
        songList: state.songList.filter(song => song.id !== action.payload.id)
    }
}

export default { initialState, actions }
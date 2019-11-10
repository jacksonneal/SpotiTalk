export default function SongSearchDispatcher(dispatch) {
    return {
        searchSongTitle: (title) => {
            dispatch({
                type: 'SEARCH_SONG_TITLE',
                payload: {
                    searchTitle: title,
                }
            })
        },
        searchSongArtist: (artist) => {
            dispatch({
                type: 'SEARCH_SONG_ARTIST',
                payload: {
                    searchArtist: artist,
                }
            })
        },
        saveAuthToken: (token) => {
            dispatch({
                type: 'SAVE_AUTH_TOKEN',
                payload: {
                    authToken: token,
                }
            })
        }
    }
}
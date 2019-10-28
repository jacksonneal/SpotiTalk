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
        }
    }
}
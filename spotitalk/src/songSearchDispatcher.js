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
    }
}
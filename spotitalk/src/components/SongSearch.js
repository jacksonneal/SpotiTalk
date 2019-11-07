import React from 'react';
import SongList from './SongList';
import SongSearchBar from './SongSearchBar';

export default function SongSearch(props) {
    const { searchSongTitle, searchSongArtist, authToken } = props;

    return (
        <div>
            <div>Here is the song list/search page</div>
            <SongSearchBar {...{ searchSongTitle, searchSongArtist }} />
            <SongList {...{ authToken }} />
        </div>
    )
}
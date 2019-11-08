import React, { useState } from 'react';
import SongList from './SongList';
import SongSearchBar from './SongSearchBar';
import service from '../services/ApiService';

export default function SongSearch(props) {
    const { searchSongTitle, searchSongArtist, songSearchTitle, songSearchArtist, authToken } = props;
    const [songList, setSongList] = useState([]);

    async function search(title, artist) {
        searchSongTitle(title);
        searchSongArtist(artist);
        const songs = await service.searchSongs(title, artist, authToken);
        setSongList(songs.tracks.items);
    }

    return (
        <div>
            <div>Here is the song list/search page</div>
            <SongSearchBar {...{ songSearchArtist, songSearchTitle, search }} />
            <SongList {...{ songList }} />
        </div>
    )
}
import React from 'react';
import SongList from './SongList';

export default function SongSearch(props) {
    console.log('***Props***', props);
    return (
        <div>
            <div>Here is the song list/search page</div>
            <SongList />
        </div>
    )
}
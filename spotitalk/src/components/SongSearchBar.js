import React from 'react';

export default function SongSearch(props) {
    const { searchSongTitle, searchSongArtist } = props;

    return (
        <div class="pos-f-t">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <span class="navbar-brand">
                    SpotiTalk
                </span>
                <input class="form-control" id="songTitleSearch"
                    placeholder="Enter title here" onChange={e => searchSongTitle(e.target.value)} />
                <input class="form-control" id="songArtistSearch"
                    placeholder="Enter artist here" onChange={e => searchSongArtist(e.target.value)} />
            </nav>
        </div>
    )
}
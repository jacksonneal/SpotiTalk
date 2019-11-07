import React from 'react';

export default function SongSearch(props) {
    const { searchSongTitle, searchSongArtist } = props;

    return (
        <div className="pos-f-t">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-brand">
                    SpotiTalk
                </span>
                <input className="form-control" id="songTitleSearch"
                    placeholder="Enter title here" onChange={e => searchSongTitle(e.target.value)} />
                <input className="form-control" id="songArtistSearch"
                    placeholder="Enter artist here" onChange={e => searchSongArtist(e.target.value)} />
            </nav>
        </div>
    )
}
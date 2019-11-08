import React, { useState } from 'react';

export default function SongSearch(props) {
    const { songSearchTitle, songSearchArtist, search } = props;
    const [title, setTitle] = useState(songSearchTitle);
    const [artist, setArtist] = useState(songSearchArtist);

    function noQuery() {
        return !(title && artist);
    }

    return (
        <div className="pos-f-t">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-brand">
                    SpotiTalk
                </span>
                <input value={title} className="form-control" id="songTitleSearch"
                    placeholder="Enter title here" onChange={(e) => setTitle(e.target.value)} />
                <input value={artist} className="form-control" id="songArtistSearch"
                    placeholder="Enter artist here" onChange={(e) => setArtist(e.target.value)} />
                <button className="btn btn-success form-control" onClick={() => search(title, artist)} disabled={noQuery()}>
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </nav>
        </div>
    )
}
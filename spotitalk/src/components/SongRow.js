import React from 'react';
import { Link } from 'react-router-dom';

export default function SongRow(props) {
    const { song } = props;

    return (
        <tr>
            <td>
                <Link to={{
                    pathname: "SongSoloView",
                    state: song,
                }}
                >
                    {song.title}
                </Link>
            </td>
            <td>
                {song.artist}
            </td>
            <td>
                {song.album}
            </td>
        </tr>
    );
};
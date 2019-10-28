import React from 'react'
import SongRow from './SongRow';

export default function SongList(props) {
    const songList = [{ id: "123", title: "Infallible", artist: "Pearl Jam", album: "Lightning Bolt" }]; // will be fetched from the api
    return (
        <table class="table table-striped">
            <thead>
                <tr>
                    <td>
                        <h4>
                            Title
                        </h4>
                    </td>
                    <td>
                        <h4>
                            Artist
                        </h4>
                    </td>
                    <td>
                        <h4>
                            Album
                        </h4>
                    </td>
                </tr>
            </thead>
            <tbody>
                {
                    songList.map(song =>
                        <SongRow
                            key={song.id}
                            {...{ song }}
                        />
                    )
                }
            </tbody>
        </table>
    )
}

import React from 'react'
import SongRow from './SongRow'

export default function SongList(props) {
  const { songList } = props;

  function mappedTracks() {
    return songList.map(track => {
      return {
        id: track.id,
        title: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        artwork: track.album.images && track.album.images[0].url,
      }
    });
  }

  return (
    <table className="table table-striped">
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
          mappedTracks().map(song =>
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
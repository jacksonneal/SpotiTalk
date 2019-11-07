import React, { useEffect, useState } from 'react'
import SongRow from './SongRow';
import ApiService from "../services/ApiService";

export default function SongList(props) {
  const { authToken } = props;
  const [songList, setSongList] = useState([{
    id: "123",
    title: "Infallible",
    artist: "Pearl Jam",
    album: "Lightning Bolt"
  }]); // will be fetched from the api

  useEffect(() => {
    async function fetchData() {
      let trackResult = await ApiService.searchSongs('Monster Mash', authToken);
      let mappedResult = trackResult.tracks.items.map(
        track => {
          return {
            id: track.id,
            title: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            artwork: track.album.images && track.album.images[0].url,
          }
        });
      setSongList(mappedResult);
    }

    fetchData();
  }, [authToken])
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

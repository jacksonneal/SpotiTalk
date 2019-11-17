const { makeApiRequest, extractImage } = require('./spotify_api_helper.js')

function shortenedArtistName(artists) {
  return artists.length === 1 ? artists[0].name : `${artists[0].name} and others`;
}

function formatSongs(songs) {
  return songs.map(song => {
    return {
      id: song.id,
      name: song.name,
      artist: shortenedArtistName(song.artists),
      image: extractImage(song.album.images)
    };
  });
}

function formatArtists(artists) {
  return artists.map(artist => ({
    id: artist.id,
    name: artist.name,
    image: extractImage(artist.images)
  }));
}

function formatAlbums(albums) {
  return albums.map(album => ({
    id: album.id,
    name: album.name,
    artist: shortenedArtistName(album.artists),
    image: extractImage(album.images)
  }));
}

function search(query) {
  const uri = `https://api.spotify.com/v1/search?q=${query}&type=track,album,artist&limit=8`;
  return makeApiRequest(uri).then(results => {
    return {
      songs: formatSongs(results.tracks.items),
      artists: formatArtists(results.artists.items),
      albums: formatAlbums(results.albums.items)
    }
  });
}

module.exports = {
  search: search
}


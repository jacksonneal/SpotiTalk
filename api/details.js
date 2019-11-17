const { makeApiRequest, extractImage } = require('./spotify_api_helper.js')

function getSong(id) {
  const uri = `https://api.spotify.com/v1/tracks/${id}`;
  return makeApiRequest(uri).then(song => {
    return {
      id: song.id,
      name: song.name,
      artists: song.artists.map(artist => {
        return {
          id: artist.id,
          name: artist.name
        }
      }),
      album: {
        id: song.album.id,
        name: song.album.name,
        image: extractImage(song.album.images)
      }
    };
  });
};

function getArtist(id) {
  const uri = `https://api.spotify.com/v1/artists/${id}`;
  return makeApiRequest(uri).then(artist => {
    console.log(artist)
    return {
      id: artist.id,
      name: artist.name,
      image: extractImage(artist.images)
    };
  });
}

function getAlbum(id) {
  const uri = `https://api.spotify.com/v1/albums/${id}`;
  return makeApiRequest(uri).then(album => {
    return {
      id: album.id,
      name: album.name,
      artists: album.artists.map(artist => {
        return {
          id: artist.id,
          name: artist.name
        }
      }),
      image: extractImage(album.images)
    };
  });
}

module.exports = {
  getSong: getSong,
  getArtist, getArtist,
  getAlbum: getAlbum
}



const fetch = require("node-fetch");

function accessToken() {
  // TODO (when we release final version) reset the secret and hide both values before deploying
  var client_id = 'b02c94c4049448e48449e6bb3ef02259';
  var client_secret = 'd396b66f1e0e43f5a96f99e973482670';

  return fetch('https://accounts.spotify.com/api/token', {
    body: 'grant_type=client_credentials',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST'
  }).then(response => {
    if (response.status === 200) {
      return response.json().then(json => json.access_token);
    } else {
      throw `Authorization request returned status code ${response.status}`;
    }
  });
}

function makeApiRequest(uri) {
  return accessToken().then(token => {
    return fetch(encodeURI(uri), {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if (response.status === 200) {
        return response.json()
      } else {
        throw `API request at ${uri} returned status code ${response.status}`;
      }
    });
  });
}

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
        image: song.album.images[1].url
      }
    };
  });
};

function searchSongs(query) {
  const uri = `https://api.spotify.com/v1/search?q=${query}&type=track`;
  return makeApiRequest(uri).then(results => results.tracks.items.map(song => {
    const artist = song.artists.length === 1 ? song.artists[0].name : `${song.artists[0].name} and others`;
    return {
      id: song.id,
      name: song.name,
      artist: artist,
      image: song.album.images[1].url
    }
  }));
}

module.exports = {
    getSong: getSong,
    searchSongs: searchSongs
}


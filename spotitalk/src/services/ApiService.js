class ApiService {
  accessToken() {
    // TODO (when we release final version) reset the secret and hide both values before deploying
    var client_id = 'b02c94c4049448e48449e6bb3ef02259';
    var client_secret = 'd396b66f1e0e43f5a96f99e973482670';

    return fetch('https://accounts.spotify.com/api/token', {
      body: 'grant_type=client_credentials',
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    }).then(response => {
      if (response.status === 200) {
        return response.json().then(json => json.access_token);
      } else {
        throw 'Authorization request failed';
      }
    });
  }

  makeApiRequest(uri) {
    return this.accessToken().then(token => {
      return fetch(encodeURI(uri), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        if (response.status === 200) {
          return response.json()
        } else {
          throw 'Authorization request failed';
        }
      });
    });
  }

  getSong(id) {
    return this.makeApiRequest(`https://api.spotify.com/v1/tracks/${id}`);
  }

  searchSongs(query) {
    return this.makeApiRequest(`https://api.spotify.com/v1/search?q=${query}&type=track`);
  }
}

export default ApiService;

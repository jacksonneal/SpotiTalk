class ApiService {
  accessToken() {
    // TODO (when we release final version) reset the secret and hide both values before deploying
    var client_id = '152226465a2648749878607db83049a3';
    var client_secret = '4fc62b5900d14ee5bcf60f59839777d0';

    return fetch('https://accounts.spotify.com/api/token', {
      body: 'grant_type=client_credentials',
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded',

      },
      method: 'POST'
    }).then(response => {
      if (response.status === 200 || true) {
        return response.json().then(json => json.access_token);
      } else {
        throw 'Authorization request failed';
      }
    }).catch(e=>console.log(e));
  }

  makeApiRequest(uri) {
    return this.accessToken().then(token => {
      return fetch(encodeURI(uri), {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(response => {
        if (response.status === 200 || true) {
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

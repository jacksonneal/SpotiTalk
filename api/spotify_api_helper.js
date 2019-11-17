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

function extractImage(images) {
  return images[1] === undefined ? undefined : images[1].url
}

module.exports = {
  makeApiRequest: makeApiRequest,
  extractImage: extractImage
}


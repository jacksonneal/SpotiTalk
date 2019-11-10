// class ApiService {
//   accessToken() {
//     // TODO (when we release final version) reset the secret and hide both values before deploying
//     var client_id = '152226465a2648749878607db83049a3';
//     var client_secret = '4fc62b5900d14ee5bcf60f59839777d0';

//     return fetch('https://accounts.spotify.com/api/token', {
//       body: 'grant_type=client_credentials',
//       mode: 'no-cors',
//       headers: {
//         'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       method: 'POST'
//     }).then(async response => {
//       console.log(await response.json());

//       if (response.status === 200 || true) {
//         return response.json().then(json => json.access_token);
//       } else {
//         throw 'Authorization request failed';
//       }
//     }).catch(e => console.log(e, 'failure'));
//   }

//   makeApiRequest(uri) {
//     return this.accessToken().then(token => {
//       console.log('**got token', token);
//       return fetch(encodeURI(uri), {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       }).then(response => {
//         if (response.status === 200 || true) {
//           return response.json()
//         } else {
//           throw 'Authorization request failed';
//         }
//       });
//     });
//   }

//   getSong(id) {
//     return this.makeApiRequest(`https://api.spotify.com/v1/tracks/${id}`);
//   }

//   searchSongs(queryString) {
//     return this.makeApiRequest(`https://api.spotify.com/v1/search?q=${queryString}&type=track`);
//   }
// }

async function searchSongs(title, artist, token) {
  const queryString = `artist:${artist}%20track:${title}`
  const uri = `https://api.spotify.com/v1/search?q=${queryString}&type=track`;
  const res = await fetch(uri, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return await res.json();
}

export default { searchSongs };


//export default ApiService;

const express = require('express');
const path = require('path');
const detailsApi = require('./api/details.js');
const searchApi = require('./api/search.js');

const app = express();

// serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// returns a song
app.get('/api/songs/:id', (req, res) => {
  detailsApi.getSong(req.params.id).then(song => {
    res.json(song);
  });
})

// returns an artist
app.get('/api/artists/:id', (req, res) => {
  detailsApi.getArtist(req.params.id).then(artist => {
    res.json(artist);
  });
})

// returns an album
app.get('/api/albums/:id', (req, res) => {
  detailsApi.getAlbum(req.params.id).then(album => {
    res.json(album);
  });
})

// returns search results for a song
app.get('/api/search/:query', (req, res) => {
  searchApi.search(req.params.query).then(results => {
    res.json(results);
  });
})

// handles any requests that don't match the ones above
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);


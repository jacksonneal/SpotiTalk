import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SongView from './components/songs/SongView.js';
import AlbumView from './components/albums/AlbumView.js';
import ArtistView from './components/artists/ArtistView.js';
import SearchContainer from './components/search/SearchContainer.js';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Router>
          <div>
            <Route exact path="/" component={SearchContainer} />
            <Route exact path="/search/:criteria" component={SearchContainer} />
            <Route exact path="/songs/:id" component={SongView} />
            <Route exact path="/albums/:id" component={AlbumView} />
            <Route exact path="/artists/:id" component={ArtistView} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;


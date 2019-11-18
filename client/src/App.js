import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SongView from './components/songs/SongView.js';
import AlbumView from './components/albums/AlbumView.js';
import ArtistView from './components/artists/ArtistView.js';
import SearchContainer from './components/search/SearchContainer.js';
import SpotiNavigation from './components/search/SpotiNavigation';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inForum: false,
    }
    this.setInForum = this.setInForum.bind(this);
  }

  setInForum(val) {
    this.setState({
      inForum: val,
    });
  }

  render() {
    return (
      <div className='App'>
        <Router>
          <div>
            <SpotiNavigation inForum={this.state.inForum} setInForum={this.setInForum} />
            <Route exact path={["/", "/search", "/search/:criteria", "/forum", "/forum/:criteria"]}
              render={(props) => <SearchContainer {...props} inForum={this.state.inForum} />} />
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


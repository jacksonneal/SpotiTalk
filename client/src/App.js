import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SongView from './components/songs/SongView.js';
import AlbumView from './components/albums/AlbumView.js';
import ArtistView from './components/artists/ArtistView.js';
import SearchContainer from './components/search/SearchContainer';
import SpotiNavigation from './components/search/SpotiNavigation';
import Login from './components/accounts/Login';
import Register from './components/accounts/Register';

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
      <>
        <SpotiNavigation {...this.props} inForum={this.state.inForum} setInForum={this.setInForum} />
        <div className='App'>
          <Router>
            <div>
              <Route exact path={["/", "/search", "/search/:criteria", "/forum", "/forum/:criteria"]}
                render={() => <SearchContainer {...this.props} inForum={this.state.inForum} />} />
              <Route exact path="/songs/:id" component={SongView} />
              <Route exact path="/albums/:id" component={AlbumView} />
              <Route exact path="/artists/:id" component={ArtistView} />
              <Route exact path="/login" render={() => <Login {...this.props}></Login>} />
              <Route exact path="/register" render={() => <Register {...this.props}></Register>} />
            </div>
          </Router>
        </div>
      </>
    );
  }
}

export default App;


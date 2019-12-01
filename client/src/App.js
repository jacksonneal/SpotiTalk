import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withCookies } from 'react-cookie';
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
  }

  render() {
    return (
      <>
        <SpotiNavigation {...this.props} />
        <div className='App'>
          <Router basename="">
            <div>
              <Route exact path={["/", "/search", "/search/:criteria"]}
                render={(props) => <SearchContainer {...this.props} {...props} inForum={false} />} />
              <Route exact path={["/forum", "/forum/:criteria"]}
                render={(props) => <SearchContainer {...this.props} {...props} inForum={true} />} />
              <Route exact path="/songs/:id" render={(props) => <SongView {...props} {...this.props} />} />
              <Route exact path="/albums/:id" component={AlbumView} />
              <Route exact path="/artists/:id" render={(props) => <ArtistView {...props} {...this.props} />} />
              <Route exact path="/login" render={() => <Login {...this.props}></Login>} />
              <Route exact path="/register" render={() => <Register {...this.props}></Register>} />
            </div>
          </Router>
        </div>
      </>
    );
  }
}

export default withCookies(App);


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
import Forum from './components/forum/Forum.js';
import Privacy from "./components/privacy/Privacy";
import Profile from './components/profile/Profile.js';
import PostView from './components/posts/PostView.js';

class App extends React.Component {
  render() {
    const cookies = this.props.cookies;
    return (
      <>
        <SpotiNavigation {...this.props} />
        <div className='App'>
          <Router basename="">
            <div>
              <Route exact path={["/", "/forum"]} render={props => <Forum {...props} cookies={cookies} />} />
              <Route exact path={["/search", "/search/:criteria"]} component={SearchContainer} />
              <Route exact path="/posts/:id" render={props => <PostView {...props} cookies={cookies} />} />
              <Route exact path="/songs/:id" render={props => <SongView {...props} cookies={cookies} />} />
              <Route exact path="/albums/:id" render={props => <AlbumView {...props} cookies={cookies} />} />
              <Route exact path="/artists/:id" render={props => <ArtistView {...props} cookies={cookies} />} />
              <Route exact path="/profile/:id" component={Profile} />
              <Route exact path="/login" render={() => <Login cookies={cookies} />} />
              <Route exact path="/register" render={() => <Register cookies={cookies} />} />
              <Route exact path="/privacy" component={Privacy} />
            </div>
          </Router>
        </div>
      </>
    );
  }
}

export default withCookies(App);


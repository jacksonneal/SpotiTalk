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
    return (
      <>
        <SpotiNavigation {...this.props} />
        <div className='App'>
          <Router basename="">
            <div>
              <Route exact path={["/search", "/search/:criteria"]}
                render={(props) => <SearchContainer {...this.props} {...props} />} />
              <Route exact path={["/", "/forum"]} render={(props) => <Forum {...this.props} {...props} results={[]} critera=''/>} />
              <Route exact path="/posts/:id" render={routeProps => <PostView {...routeProps} cookies={this.props.cookies} />} />
              <Route exact path="/songs/:id" render={(props) => <SongView {...props} {...this.props} />} />
              <Route exact path="/albums/:id" render={(props) => <AlbumView {...props} {...this.props} />} />
              <Route exact path="/artists/:id" render={(props) => <ArtistView {...props} {...this.props} />} />
              <Route exact path="/profile/:id" component={Profile} />
              <Route exact path="/login" render={() => <Login {...this.props}></Login>} />
              <Route exact path="/register" render={() => <Register {...this.props}></Register>} />
              <Route exact path="/privacy" render={()=> <Privacy {...this.props}/>}/>
            </div>
          </Router>
        </div>
      </>
    );
  }
}

export default withCookies(App);


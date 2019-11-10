import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SongSearch from './components/SongSearch';
import SongSoloView from './components/SongSoloView';
import SongSearchDispatcher from './dispatchers/songSearchDispatcher';
import { authEndpoint, clientId, redirectUri, scopes, showDialogue } from './config';
import hash from "./hash";

class App extends React.Component {
  componentDidMount() {
    const { saveAuthToken } = this.props;
    let _token = hash().access_token;
    if (_token) {
      saveAuthToken(_token);
    }
  }

  getAuthorizationEndpoint() {
    return `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=${showDialogue}`;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.props.authToken && (
            <a
              className="btn btn--loginApp-link"
              href={this.getAuthorizationEndpoint()}
            >
              Login to SpotiTalk
            </a>
          )}
          {this.props.authToken && (
            <div>
              <Router>
                <div>
                  <Route exact path="/" render={() => <SongSearch {...this.props} />} />
                  <Route exact path="/SongSoloView" component={SongSoloView} />
                </div>
              </Router>
            </div>
          )}
        </header>
      </div>
    );
  }
}
export default connect(state => state.songs, SongSearchDispatcher)(App);

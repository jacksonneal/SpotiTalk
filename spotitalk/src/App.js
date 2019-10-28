import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SongSearch from './components/SongSearch';
import SongSoloView from './components/SongSoloView';
import SongSearchDispatcher from './dispatchers/songSearchDispatcher';

function App(props) {
  return (
    <Router>
      <div>
        <Route exact path="/" render={() => <SongSearch {...props} />} />
        <Route exact path="/SongSoloView" component={SongSoloView} />
      </div>
    </Router>
  );
}

export default connect(state => state.songs, SongSearchDispatcher)(App);
import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SongSearch from './components/SongSearch';

function App(props) {
  return (
    <Router>
      <div>
        <Route exact path="/" render={() => <SongSearch {...props} />} />
      </div>
    </Router>
  );
}

export default connect(state => state)(App);
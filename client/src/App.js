import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    //<Route exact path="/" component={/* todo */} />
    return (
      <div className='App'>
        <Router>
          <div>
            // <Route exact path="/songs/:id" component={SongView} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;


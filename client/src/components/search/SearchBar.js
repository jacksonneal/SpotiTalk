import React from 'react';
import { Link } from 'react-router-dom';

class SearchBar extends React.Component {
  state = {
    value: ''
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  }

  getQueryURL() {
    return this.props.inForum ? `/forum/${this.state.value}` : `/search/${this.state.value}`;
  }

  render() {
    return (
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder='Search for a song, artist, or album' value={this.state.value} onChange={this.handleChange} />
        <div className="input-group-append">
          <Link to={this.getQueryURL()}>
            <span class="btn btn-light">Search</span>
          </Link>
        </div>
      </div >
    )
  }
}

export default SearchBar;


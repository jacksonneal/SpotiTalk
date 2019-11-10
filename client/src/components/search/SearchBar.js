import React from 'react';

class SearchBar extends React.Component {
  state = {
    value: ''
  }

  handleChange = event => {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder='Song name...' value={this.state.value} onChange={this.handleChange} />
        <div className="input-group-append">
          <a className="btn btn-light" type="button" href={`/search/${this.state.value}`}>Search</a>
        </div>
      </div>
    )
  }
}

export default SearchBar;


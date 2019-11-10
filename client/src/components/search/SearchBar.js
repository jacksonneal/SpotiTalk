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
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder='Song name...' value={this.state.value} onChange={this.handleChange} />
        <div class="input-group-append">
          <a class="btn btn-light" type="button" href={`/search/${this.state.value}`}>Search</a>
        </div>
      </div>
    )
  }
}

export default SearchBar;


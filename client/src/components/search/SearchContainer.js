import React from 'react';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js';

class SearchContainer extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <SearchResults criteria={this.props.match.params.criteria} />
      </div>
    );
  }
}

export default SearchContainer;


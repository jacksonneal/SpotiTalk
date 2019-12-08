import React from 'react';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js';

class SearchContainer extends React.Component {
  getCriteria() {
    try {
      return this.props.match.params.criteria;
    } catch {
      return undefined;
    }
  }

  render() {
    return (
      <div>
        <SearchBar />
        <SearchResults criteria={this.getCriteria()} />
      </div>
    );
  }
}

export default SearchContainer;


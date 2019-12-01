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
        <SearchBar inForum={this.props.inForum} />
        <SearchResults cookies={this.props.cookies} criteria={this.getCriteria()} inForum={this.props.inForum} />
      </div>
    );
  }
}

export default SearchContainer;


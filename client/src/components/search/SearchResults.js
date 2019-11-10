import React from 'react';

class SearchResults extends React.Component {
  state = {
    results: []
  }

  componentDidMount() {
    const criteria = this.props.criteria;
    if (criteria === undefined) {
      return;
    }
    fetch(`/api/search/${criteria}`)
      .then(response => response.json())
      .then(results => {
        this.setState(() => ({ results }))
      });
  }

  render() {
    const { results } = this.state;
    return results.length === 0 ?
      (<p>Search for a song!</p>) :
      (
        <div>
          {
            results.map(song => (
              <span className="spotitalk--song-search-container" key={song.id}>
                <a className="text-white" href={`/songs/${song.id}`}>
                  <img src={song.image} style={{width: '300px'}} alt={`Album cover for ${song.name}`}/>
                  <div className="spotitalk--song-search-text">
                    <h5>{song.name}</h5>
                    <p>by {song.artist}</p>
                  </div>
                </a>
              </span>
            ))
          }
          <p className="text-secondary">Only displaying first 20 results</p>
        </div>
      )
  }
}

export default SearchResults;


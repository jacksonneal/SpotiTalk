import React from 'react';
import { Link } from 'react-router-dom';

class SpotiNavigation extends React.Component {
  render() {
    return (
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item">
          <Link to="/search">
            <span class={'spotitalk--link'} onClick={() => this.props.setInForum(false)}>Search</span>
          </Link>
        </li>
        <li class="nav-item">
          <Link to="/forum">
            <span class="spotitalk--link" onClick={() => this.props.setInForum(true)}>Forum</span>
          </Link>
        </li>
      </ul>
    );
  }
}

export default SpotiNavigation;


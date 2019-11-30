import React from 'react';
import { Link } from 'react-router-dom';

class SpotiNavigation extends React.Component {
  render() {
    return (
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item">
          <Link to="/search">
            <span className={'spotitalk--link'} onClick={() => this.props.setInForum(false)}>Search</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/forum">
            <span className="spotitalk--link" onClick={() => this.props.setInForum(true)}>Forum</span>
          </Link>
        </li>
      </ul>
    );
  }
}

export default SpotiNavigation;


import React from 'react';
import ForumPostList from '../../components/forum/ForumPostList.js';

class Profile extends React.Component {
  state = {
    profile: null,
    posts: []
  }

  componentDidMount() {
    const { id } = this.props.match.params
    fetch(`/api/users/${id}`)
      .then(response => response.json())
      .then(([profile]) => {
        this.setState({ profile })
      });
    fetch(`/api/users/${id}/posts`)
      .then(response => response.json())
      .then(posts => {
        this.setState({ posts })
      });
  }

  render() {
    const { profile, posts } = this.state;
    return profile === null ?
      (<p>Loading...</p>) :
      (
        <div>
          <h1>{profile.username}</h1>
          <p>Posts by this user</p>
          <ForumPostList posts={posts} />
        </div>
      )
  }
}

export default Profile;


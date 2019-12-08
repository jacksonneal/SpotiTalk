import React from 'react';
import moderationService from '../../services/moderation.js';
import Button from 'react-bootstrap/Button';

class ModerationToggle extends React.Component {
  state = {
    spotifyUri: this.props.spotifyUri,
    userId: this.props.userId,
    isModerator: this.props.isModerator,
    moderationId: null,
    spotifyType: this.props.spotifyType,
    loading: true
  }

  componentDidMount() {
    moderationService.getModeration(this.state.userId).then(moderation => {
      const moderationForThisUri = moderation.find(mod => mod.spotify_uri === this.state.spotifyUri);
      if (moderationForThisUri !== undefined) {
        this.setState({ moderationId: moderationForThisUri.id });
      }
      this.setState({ loading: false });
    });
  }

  becomeModerator = () => {
    moderationService.createModeration({
      spotify_uri: this.state.spotifyUri,
      user_id: this.state.userId
    }).then(moderation => {
      this.setState({ moderationId: moderation.insertId })
    });
  }

  stopBeingModerator = () => {
    moderationService.deleteModeration(this.state.moderationId)
      .then(() => {
        this.setState({ moderationId: null })
      });
  }

  render() {
    return (this.state.isModerator && !this.state.loading) ? (
      <div className='mb-4'>
        <p>Moderation privileges:</p>
        { this.state.moderationId === null ? (
          <Button className='btn-primary' onClick={this.becomeModerator}>Become moderator for this {this.state.spotifyType}</Button>
        ) : (
          <Button className='btn-danger' onClick={this.stopBeingModerator}>Stop moderating this {this.state.spotifyType}</Button>
        )}
      </div>
    ) : (
      <div></div>
    );
  }
}

export default ModerationToggle;


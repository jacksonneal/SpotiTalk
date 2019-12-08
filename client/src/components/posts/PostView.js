import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CommentForm from '../forum/CommentForm';
import CommentList from '../forum/CommentList';
import commentService from '../../services/comment';
import { Redirect } from 'react-router';
import postService from '../../services/post.js';


class PostView extends React.Component {
  state = {
    userId: this.props.cookies.get("userId"),
    comments: [],
    post: null,
    isModerator: this.props.cookies.get("isModerator") === '1',
    moderatesThisPost: false,
    redirect: false
  }

  fetchComments = async () => {
      const comments = await commentService.getComments(this.state.post.post_id);
      this.setState({ comments });
  }

  getTime(ts) {
      var t = ts.split(/[- :TZ]/);
      var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
      return d.toString();
  }

  deletePost = async () => {
    await postService.deletePost(this.state.post.post_id);
    this.setState({ redirect: true })
  }

  linkToTopic() {
    const spotifyTypeMapping = {
      'track': 'songs',
      'album': 'albums',
      'artist': 'artists'
    };
    const uriParts = this.state.post.spotify_uri.split(':');
    return `/${spotifyTypeMapping[uriParts[1]]}/${uriParts[2]}`;
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(`/api/posts/${id}`)
      .then(response => response.json())
      .then(([post]) => { this.setState({ post }) })
      .then(() => { this.fetchComments(); })
      .then(() => {
        fetch(`/api/user/${this.state.userId}/moderation`)
          .then(moderation => moderation.json())
          .then(moderation => {
            this.setState({
              moderatesThisPost: moderation.find(mod => mod.spotify_uri === this.state.post.spotify_uri) !== undefined
            });
          });
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
    const { userId, comments, post, moderatesThisPost, isModerator } = this.state;
    return post === null ? (
      <p>Loading...</p>
    ) : (
      <div>
        { moderatesThisPost && (
          <div className='mb-4'>
            <p>Moderator privileges:</p>
            <Button className='btn-danger' onClick={this.deletePost}>Delete post</Button>
          </div>
        )}
        { (isModerator && !moderatesThisPost ) && (
          <i>To moderate this post, please <a className='spotitalk--link' href={this.linkToTopic()}>become a moderator for this topic</a></i>
        )}
        <a className='spotitalk--link' href={this.linkToTopic()}>Link to the topic being discussed</a>
        <div className="container-fluid mt-1">
            <Card className="bg-dark text-white">
                <Card.Header bg="info" text="white">
                    <time className="pull-right">
                        <span className="calendar">
                            <i className="fa fa-calendar mr-2"></i>
                            {this.getTime(post.ts)}
                        </span>
                        <span className="clock">
                            <i className="fa fa-clock-o ml-2"></i>
                        </span>
                    </time>
                    <span className="pull-left mr-3">
                        <i className="fa fa-user mr-2"></i>
                        <a className="spotitalk--link" href={`/profile/${post.user_id}`}>{post.username}</a>
                    </span>
                    <span className="mb-2 text-muted pull-left">
                        {post.subject}
                    </span>
                </Card.Header>
                <Card.Body>
                    <div className="row">
                        <div className="col-8">
                            <div className="row">
                                <h3 className="subject-line">
                                    {post.title}
                                </h3>
                            </div>
                            <div>
                                <hr className="break-line" />
                            </div>
                            <div className="row">
                                <Card.Text className="m-3">
                                    {post.content}
                                </Card.Text>
                            </div>
                        </div>
                        <hr className="break-line" />
                        <div className="col-4">
                            {post.img_src &&
                                <a href={this.linkToTopic()}>
                                  <img className="image-box" alt='Post' src={post.img_src} />
                                </a>
                            }
                        </div>
                    </div>
                </Card.Body>
            </Card >
            <div className='mt-2'>
              <CommentList open comments={comments}></CommentList>
            </div>
            <CommentForm openComments postId={post.post_id} userId={userId} fetchComments={this.fetchComments} />
        </div>
      </div>
    )
  }
}

export default PostView;

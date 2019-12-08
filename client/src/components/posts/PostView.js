import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CommentForm from '../forum/CommentForm';
import CommentList from '../forum/CommentList';
import commentService from '../../services/comment';


class PostView extends React.Component {
  state = {
    isModerator: this.props.cookies.get("isModerator"),
    userId: this.props.cookies.get("userId"),
    comments: [],
    post: null
  }

  canDelete() {
      return !this.state.isModerator || this.state.isModerator === '0';
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

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(`/api/posts/${id}`)
      .then(response => response.json())
      .then(([post]) => { this.setState({ post }) })
      .then(() => { this.fetchComments(); });
  }

  render() {
    const { isModerator, userId, comments, post } = this.state;
    return post === null ? (
      <p>Loading...</p>
    ) : (
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
                              <img className="image-box" alt='Post' src={post.img_src} />
                          }
                      </div>
                  </div>
              </Card.Body>
              <Card.Footer>
                  <Button disabled={this.canDelete()} className="btn btn-danger pull-left" onClick={() => this.deletePost(post.post_id)}>
                      Delete
                  </Button>
              </Card.Footer>
          </Card >
          <div className='mt-2'>
            <CommentList open comments={comments}></CommentList>
          </div>
          <CommentForm openComments postId={post.post_id} userId={userId} fetchComments={this.fetchComments} />
      </div>
    )
  }
}

export default PostView;

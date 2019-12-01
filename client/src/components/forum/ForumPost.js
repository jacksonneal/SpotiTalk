import React from 'react';
import Button from 'react-bootstrap/Button';

export default function ForumPost(props) {
    const { post, deletePost, isModerator } = props;

    return (
        <div id={post.id} key={post.id} className="row post">
            <div className="col-12">
                <div className="panel-heading post-header">
                    <span className="pull-left">
                        #{post.post_id}
                    </span>
                    <span className="pull-left">
                        {post.title}
                    </span>
                    <time className="pull-right">
                        <span className="calendar">
                            <i className="fa fa-calendar"></i>
                            {post.ts}
                        </span>
                        <span className="clock">
                            <i className="fa fa-clock-o"></i>
                        </span>
                        {post.time}
                    </time>
                    <Button disabled={isModerator == 0} className="btn btn-default" onClick={() => deletePost(post.post_id)}>
                        Delete
                    </Button>
                </div>
            </div>
            <div className="col-12">
                <div className="post-body">
                    <div className="row">
                        <div className="col-8">
                            <div className="row">
                                <h3 className="subject-line">
                                    {post.subject}
                                </h3>
                            </div>
                            <div>
                                <hr className="break-line" />
                            </div>
                            <div className="row">
                                <p className="post-content">
                                    {post.content}
                                </p>
                            </div>
                        </div>
                        <hr className="break-line" />
                        <div className="col-4">
                            <img className="image-box" alt='Post' src={post.img_src} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="post-footer">
                    <span className="pull-left">
                        Like
              </span>
                    <span className="pull-right">
                        Reply
              </span>
                </div>
            </div>
        </div>
    )
}


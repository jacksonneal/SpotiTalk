import React from 'react';

export default function ForumPost(props) {
    const { post, deletePost } = props;

    return (
        <div id={post.id} key={post.id} className="row post">
            <div className="col-12">
                <div className="panel-heading post-header">
                    <span className="pull-left">
                        #{post.id}
                    </span>
                    <span className="pull-left">
                        {post.title}
                    </span>
                    <time class="pull-right">
                        <span className="calendar">
                            <i class="fa fa-calendar"></i>
                            {post.time}
                        </span>
                        <span className="clock">
                            <i class="fa fa-clock-o"></i>
                        </span>
                        {post.time}
                    </time>
                    <button className="btn btn-default" onClick={() => deletePost(post.id)}>
                        Delete
              </button>
                </div>
            </div>
            <div className="col-12">
                <div className="post-body">
                    <div className="row">
                        <div className="col-8">
                            <div class="row">
                                <h3 class="subject-line">
                                    {post.subject}
                                </h3>
                            </div>
                            <div>
                                <hr className="break-line" />
                            </div>
                            <div class="row">
                                <p class="post-content">
                                    {post.content}
                                </p>
                            </div>
                        </div>
                        <hr className="break-line" />
                        <div className="col-4">
                            <img className="image-box" src={post.src} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="post-footer">
                    <span class="pull-left">
                        Like
              </span>
                    <span class="pull-right">
                        Reply
              </span>
                </div>
            </div>
        </div>
    )
}


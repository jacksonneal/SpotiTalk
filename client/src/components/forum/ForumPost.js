import React from 'react';
import Card from 'react-bootstrap/Card';

export default function ForumPost(props) {
    const { post } = props;

    function getTime(ts) {
        var t = ts.split(/[- :TZ]/);
        var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
        return d.toString();
    }

    return (
        <div className="container-fluid mt-1">
            <Card className="bg-dark text-white">
                <Card.Header bg="info" text="white">
                    <time className="pull-right">
                        <span className="calendar">
                            <i className="fa fa-calendar mr-2"></i>
                            {getTime(post.ts)}
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
                            <img className="image-box" alt='Post' src={post.img_src} />
                        </div>
                    </div>
                </Card.Body>
                <Card.Footer>
                    <p><a className='spotitalk--link' href={`/posts/${post.post_id}`}>View this post</a></p>
                </Card.Footer>
            </Card >
        </div>
    )
}

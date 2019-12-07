import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import commentService from '../../services/comment';


export default function ForumPost(props) {
    const { post, deletePost, isModerator, userId } = props;
    const [openComments, setOpenComments] = useState(false);
    const [comments, setComments] = useState([]);

    async function fetchComments() {
        const comments = await commentService.getComments(post.post_id);
        setComments(comments);
    }

    function getTime(ts) {
        var t = ts.split(/[- :TZ]/);
        var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
        return d.toString();
    }

    useEffect(() => {
        fetchComments();
    }, []);

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
                        #{post.post_id}
                    </span>
                    <span className="pull-left mr-3">
                        <i className="fa fa-user mr-2"></i>
                        {post.username}
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
                    <p><a className='spotitalk--link' href={`/posts/${post.post_id}`}>View this post</a></p>
                </Card.Footer>
            </Card >
            <CommentForm openComments={openComments} postId={post.post_id} userId={userId} fetchComments={fetchComments}>
            </CommentForm>
            <CommentList open={openComments} comments={comments}></CommentList>
        </div>
    )
}

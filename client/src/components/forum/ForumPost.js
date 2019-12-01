import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

export default function ForumPost(props) {
    const { post, deletePost, isModerator, userId } = props;
    const [openComments, setOpenComments] = useState(false);
    const [comments, setComments] = useState([]);

    function canDelete() {
        return !isModerator || isModerator === '0';
    }

    return (
        <div className="container-fluid mt-1">
            <Card className="bg-dark text-white">
                <Card.Header bg="info" text="white">
                    <time className="pull-right">
                        <span className="calendar">
                            <i className="fa fa-calendar"></i>
                            {post.ts}
                        </span>
                        <span className="clock">
                            <i className="fa fa-clock-o"></i>
                        </span>
                    </time>
                    <span className="pull-left mr-3">
                        #{post.post_id}
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
                                <p className="post-content">
                                    <Card.Text>

                                        {post.content}
                                    </Card.Text>
                                </p>
                            </div>
                        </div>
                        <hr className="break-line" />
                        <div className="col-4">
                            <img className="image-box" alt='Post' src={post.img_src} />
                        </div>
                    </div>
                </Card.Body>
                <Card.Footer>
                    <Button disabled={canDelete()} className="btn btn-danger pull-left" onClick={() => deletePost(post.post_id)}>
                        Delete
                    </Button>
                    <Button disabled={!userId} className="btn btn-success pull-right" onClick={() => setOpenComments(!openComments)}>
                        {!openComments && <i className="fa fa-sort-down mr-2"></i>}
                        {openComments && <i className="fa fa-sort-up mr-2"></i>}
                        Comments
                    </Button>
                </Card.Footer>
            </Card >
            <CommentForm openComments={openComments} postId={post.post_id} userId={userId}>
            </CommentForm>
            <CommentList open={openComments} comments={comments}></CommentList>
        </div>
    )
}

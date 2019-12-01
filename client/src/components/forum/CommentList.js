import React from 'react'
import Comment from './Comment';
import Collapse from 'react-bootstrap/Collapse';

export default function CommentList(props) {
    const { open, comments } = props;

    return (
        <Collapse in={open}>
            <div className="container-fluid">
                {(comments.length === 0) && <div>No Comments for this Post.</div>}
                {(comments.length > 0) && comments.map(comment => {
                    return (
                        <Comment key={comment.commentId} {...{ comment }} />
                    )
                })}
            </div>
        </Collapse>
    )
}
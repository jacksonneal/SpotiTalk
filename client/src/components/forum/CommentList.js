import React from 'react'
import Comment from './Comment';
import Collapse from 'react-bootstrap/Collapse';

export default function CommentList(props) {
    const { open, comments } = props;
    return (
        <Collapse in={open}>
            <div className="container-fluid mb-5">
                {(comments.length === 0) && <div>No Comments for this Post.</div>}
                {(comments.length > 0) && comments.map(comment => {
                    return (
                        <Comment key={comment.reply_id} {...{ comment }} />
                    )
                })}
            </div>
        </Collapse>
    )
}
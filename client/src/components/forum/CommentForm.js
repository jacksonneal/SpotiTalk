import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';

export default function CommentForm(props) {
    const { openComments, userId, postId } = props;
    const [commentContent, setCommentContent] = useState('');

    async function postComment() {
        console.log("posting a comment");
    }

    return (
        <Collapse in={openComments}>
            <form>
                <div className="input-group mb-3">
                    <input value={commentContent} onChange={e => setCommentContent(e.target.value)}
                        type="text" className="form-control" id="commentContent" placeholder="Comment" />
                    <div className="input-group-append">
                        <button onClick={postComment} type="button" className="btn btn-success btn-xs">Reply</button>
                    </div>
                </div>
            </form>
        </Collapse>)
}
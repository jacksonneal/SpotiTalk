import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import commentService from '../../services/comment';

export default function CommentForm(props) {
    const { openComments, userId, isModerator, postId, fetchComments } = props;
    const [commentContent, setCommentContent] = useState('');

    async function postComment() {
        await commentService.createComment(postId, userId, commentContent);
        fetchComments();
        setCommentContent('');
    }

    async function cantComment() {
        return !userId || isModerator === "1";
    }

    return (
        <Collapse in={openComments}>
            <form>
                <div className="input-group mb-3">
                    <input value={commentContent} onChange={e => setCommentContent(e.target.value)}
                        type="text" className="form-control" id="commentContent" placeholder="Comment" />
                    <div className="input-group-append">
                        <button onClick={postComment} disabled={cantComment()} type="button" className="btn btn-success btn-xs">Reply</button>
                    </div>
                </div>
            </form>
        </Collapse>)
}
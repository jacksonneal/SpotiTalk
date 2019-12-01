import React, { useState } from 'react';

export default function ForumPostForm(props) {
    const { postAndClose, userId } = props;
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [postImage, setPostImage] = useState('');

    function post() {
        const post = {
            user_id: userId,
            title,
            subject,
            content,
            postImg: postImage,
        }
        postAndClose(post);
    }

    return (
        <div>
            <input className="form-control form-control-lg" type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
            <input className="form-control" type="text" placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)} />
            <input className="form-control" type="text" placeholder="Image URL"
                value={postImage}
                onChange={(e) => setPostImage(e.target.value)} />
            <textarea rows={3} className="form-control form-control-sm" type="text"
                value={content}
                placeholder="Content"
                onChange={(e) => setContent(e.target.value)} />
            <button className="btn btn-success btn-block" onClick={post}>
                Post
            </button>
        </div>
    )
}
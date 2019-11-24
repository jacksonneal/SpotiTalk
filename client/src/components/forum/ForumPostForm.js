import React, { useState } from 'react';

export default function ForumPostForm(props) {
    const { createPost } = props;
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    function post() {
        const post = {
            title,
            subject,
            content,
            comments: [],
            time: '',
            date: '',
            src: '',
        }
        createPost(post);
    }

    return (
        <div>
            <input class="form-control form-control-lg" type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
            <input class="form-control" type="text" placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)} />
            <textarea rows={3} class="form-control form-control-sm" type="text"
                value={content}
                placeholder="Content"
                onChange={(e) => setContent(e.target.value)} />
            <button className="btn btn-success btn-block" onClick={post}>
                Post
            </button>
        </div>
    )
}
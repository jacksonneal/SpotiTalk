import React, { useState } from 'react';
import { Redirect } from 'react-router';
import postService from '../../services/post';

export default function ForumPostForm(props) {
    const { spotifyUri, userId, autoImg } = props;
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [redirect, setRedirect] = useState(null);

    function post() {
        const postData = {
            user_id: userId,
            title,
            subject,
            content,
            postImg: autoImg,
            spotify_uri: spotifyUri,
        }
        postService.createPost(postData).then(response => {
          setRedirect(response.insertId);
        });
    }

    return (
        redirect !== null ?  (
          <Redirect to={`/posts/${redirect}`} />
        ) : (
          <div>
            <input className="form-control form-control-lg" type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
            <input className="form-control" type="text" placeholder="Searchable Subjects"
                value={subject}
                onChange={(e) => setSubject(e.target.value)} />
            <textarea rows={3} className="form-control form-control-sm" type="text"
                value={content}
                placeholder="Content"
                onChange={(e) => setContent(e.target.value)} />
            <button className="btn btn-success btn-block" onClick={post}>
                Post
            </button>
          </div>
        )
    )
}

import React, { useState, useEffect } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import service from '../../services/post';

export default function Forum(props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    const comments = await service.getPosts();
    setResults(comments);
  }

  async function postComment() {
    const post = {
      title,
      subject,
      content,
      comments: [],
      time: '',
      date: '',
      src: '',
    }
    await service.createPost(post);
    fetchComments();
  }

  async function deletePost(id) {
    await service.deletePost(id);
    fetchComments();
  }

  return (
    <div>
      {results.map(result =>
        <div id={result.id} key={result.id} className="row post">
          <div className="col-12">
            <div className="panel-heading post-header">
              <span className="pull-left">
                #{result.id}
              </span>
              <span className="pull-left">
                {result.title}
              </span>
              <time class="pull-right">
                <span className="calendar">
                  <i class="fa fa-calendar"></i>
                  {result.time}
                </span>
                <span className="clock">
                  <i class="fa fa-clock-o"></i>
                </span>
                {result.time}
              </time>
              <button className="btn btn-default" onClick={() => deletePost(result.id)}>
                Delete
              </button>
            </div>
          </div>
          <div className="col-12">
            <div className="post-body">
              <div className="row">
                <div className="col-8">
                  <div class="row">
                    <h3 class="subject-line">
                      {result.subject}
                    </h3>
                  </div>
                  <div>
                    <hr className="break-line" />
                  </div>
                  <div class="row">
                    <p class="post-content">
                      {result.content}
                    </p>
                  </div>
                </div>
                <hr className="break-line" />
                <div className="col-4">
                  <img className="image-box" src={result.src} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="post-footer">
              <span class="pull-left">
                Like
                            </span>
              <span class="pull-right">
                Reply
                            </span>
            </div>
          </div>
        </div>)}
      <Collapse className="post-form fixed-bottom" in={open}>
        <div>
          <input class="form-control form-control-lg" type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)} />
          <input class="form-control" type="text" placeholder="Subject"
            onChange={(e) => setSubject(e.target.value)} />
          <textarea rows={3} class="form-control form-control-sm" type="text"
            placeholder="Content"
            onChange={(e) => setContent(e.target.value)} />
          <button onClick={postComment}>
            Post
          </button>
        </div>
      </Collapse>
      <footer className="navbar fixed-bottom create-post">
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          Create Post
          </Button>
      </footer>
    </div>)
}

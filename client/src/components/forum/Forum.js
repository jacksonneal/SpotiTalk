import React, {useState} from 'react';
import {Button, Collapse} from 'react-bootstrap';

export default function Forum(props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const [results,setResults] = useState([{
    id: 1,
    title: "First Post!",
    content: "This is an example post",
    subject: "Wow, isn't this great",
    time: '12:00 pm',
    src: 'https://images.unsplash.com/photo-1496196614460-48988a57fccf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80',
    date: '2019-10-10',
    comments: [
      {
        id: 1,
        content: "Wow greate post."
      }
    ]
  }, {
    id: 2,
    title: "First Post!",
    content: "This is an example post",
    subject: "Wow, isn't this great",
    time: '12:00 pm',
    src: 'https://images.unsplash.com/photo-1496196614460-48988a57fccf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80',
    date: '2019-10-10',
    comments: [
      {
        id: 1,
        content: "Wow greate post."
      }
    ]
  }, {
    id: 3,
    title: "First Post!",
    content: "This is an example post",
    subject: "Wow, isn't this great",
    time: '12:00 pm',
    src: 'https://images.unsplash.com/photo-1496196614460-48988a57fccf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80',
    date: '2019-10-10',
    comments: [
      {
        id: 1,
        content: "Wow greate post."
      }
    ]
  }]);
  return (
      <div>
        {results.map(result =>
            <div id={result.id} className="row post">
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
                        <hr className="break-line"/>
                      </div>
                      <div class="row">
                        <p class="post-content">
                          {result.content}
                        </p>
                      </div>
                    </div>
                    <hr className="break-line"/>
                    <div className="col-4">
                      <img className="image-box" src={result.src}/>
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
                   onChange={(e) => setTitle(e.target.value)}/>
            <input class="form-control" type="text" placeholder="Subject"
                   onChange={(e) => setSubject(e.target.value)}/>
            <textarea rows={3} class="form-control form-control-sm" type="text"
                      placeholder="Content"
                      onChange={(e) => setContent(e.target.value)}/>
            <button onClick={() => {
              setResults([...results,{
                  id: Date.now(),
                  title: title,
                  subject: subject,
                  content: content,
                  comments:[],
                  time: '',
                  date: '',
                  src: ''
              }])
            }}>Post
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

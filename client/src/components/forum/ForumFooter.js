import React, { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import ForumPostForm from './ForumPostForm';

export default function ForumFooter(props) {
    const { createPost, userId, autoImg, spotifyUri } = props;
    const [open, setOpen] = useState(false);

    return userId === undefined ? (
        <p><a className='spotitalk--link' href='/login'>Log in</a> to post about this</p>
    ) : (
        <>
            <Collapse className="post-form fixed-bottom" in={open}>
                <div>
                    <ForumPostForm {...{ userId, spotifyUri, autoImg }}></ForumPostForm>
                </div>
            </Collapse>
            <footer className="navbar fixed-bottom create-post">
                <Button disabled={!userId} onClick={() => setOpen(!open)}>
                    {!open && <span>Write Post <i className="fa fa-sort-down"></i></span>}
                    {open && <span>Close <i className="fa fa-sort-up"></i> </span>}
                </Button>
            </footer>
        </>
    )
}

import React, { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import ForumPostForm from './ForumPostForm';

export default function ForumFooter(props) {
    const { createPost, userId } = props;
    const [open, setOpen] = useState(false);

    function postAndClose(post) {
        setOpen(false);
        createPost(post);
    }

    return (
        <>
            <Collapse className="post-form fixed-bottom" in={open}>
                <div>
                    <ForumPostForm {...{ userId, postAndClose }}></ForumPostForm>
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
import React, { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import ForumPostForm from './ForumPostForm';

export default function ForumFooter(props) {
    const { createPost } = props;
    const [open, setOpen] = useState(false);

    return (
        <>
            <Collapse className="post-form fixed-bottom" in={open}>
                <div>
                    <ForumPostForm {...{ createPost }}></ForumPostForm>
                </div>
            </Collapse>
            <footer className="navbar fixed-bottom create-post">
                <Button onClick={() => setOpen(!open)}>
                    Write Post
                </Button>
            </footer>
        </>
    )
}
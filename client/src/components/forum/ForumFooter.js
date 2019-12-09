import React, { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import ForumPostForm from './ForumPostForm';

export default function ForumFooter(props) {
    const { userId, isModerator, autoImg, spotifyUri } = props;
    const [open, setOpen] = useState(false);

    function disallowPost() {
        return !userId || isModerator === '1';
    };

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
                    <Button disabled={disallowPost()} onClick={() => setOpen(!open)}>
                        {!open && <span>Write Post <i className="fa fa-sort-up"></i></span>}
                        {open && <span>Close <i className="fa fa-sort-down"></i> </span>}
                    </Button>
                </footer>
            </>
        )
}

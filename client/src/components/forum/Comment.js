import React from 'react'

export default function Comment(props) {
    const { comment } = props;

    return (
        <div className="container-fluid row">
            <span className="float-left">
                <span className="badge badge-pill badge-info">
                  <h6>
                    <a className="spotitalk--link" href={`/profile/${comment.user_id}`}>{comment.username}</a>
                  </h6>
                </span>
                <i className="fa fa-chevron-right m-2"></i>
                {comment.content}
            </span>
        </div>
    )
}

import React from 'react';

const Comments = (props) => {

    return (
            <ol className="commentlist">

                {
                    props.comments.map(comment =>
                        <li className="depth-1" key={comment.id}>
                            <div className="avatar">
                                <img className="avatar" src={process.env.MIX_APP_URL + '/assets/website/images/user-01.png'} alt="" width="50" height="50" />
                            </div>
                            <div className="comment-content">
                                <div className="comment-info">
                                    <cite>{comment.user.name}</cite>

                                    <div className="comment-meta">
                                        <time className="comment-time" dateTime={comment.created_at}>{comment.created_at}</time>
                                    </div>
                                </div>
                                <div className="comment-text">
                                    <p>{comment.comment}</p>
                                </div>
                            </div>
                        </li>
                    )
                }

            </ol>
    )
};

export default Comments;
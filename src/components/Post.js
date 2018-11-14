import React from 'react'

import Comments from './Comments'

export default (props) => {
    const postId = props.id

    return (
        <li className='post'>
            <div className='post__body'>
                <h1 className='post__title'>{props.title}</h1>
                <p className='post__content'>{props.content}</p>
            </div>
            <Comments
                postId={postId}
            />
        </li>
    )
}

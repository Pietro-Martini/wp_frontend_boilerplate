import React from 'react'

import Comments from './Comments'

export default (props) => {
    const postId = props.id

    return (
        <div className='post'>
            <div className='post__body'>
                <h1 className='post__title'>{props.title.rendered}</h1>
                <p className='post__content'>{props.content.rendered}</p>
            </div>
            <Comments
                postId={postId}
            />
        </div>
    )
}

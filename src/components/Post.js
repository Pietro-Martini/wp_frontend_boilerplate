import React from 'react'

import Comments from './Comments'

export default ({id, title, content, setDataFetching}) => {
    return (
        <li className='post'>
            <div className='post__body'>
                <h1 className='post__title'>{title}</h1>
                <p className='post__content'>{content}</p>
            </div>
            <Comments
                postId={id}
                setDataFetching={setDataFetching}
            />
        </li>
    )
}

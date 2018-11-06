import React from 'react'

export default ({author_name, content, author, status, date}) => (
    status === 'approved'
    ? (
        <li className='comment'>
            <h1 className='comment__author'>{author_name}</h1>
            <p className='comment__content'>{content.rendered}</p>
            <span className='comment__date'>{date}</span>
        </li>
    )
    : null
)

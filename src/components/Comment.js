import React from 'react'

import EditField from '../renderProps/EditField'

export default ({author_name, content, author, status, date}) => (
        <li className='comment'>
            <EditField fieldsToEditClassNames={['comment__content']}>
                <h1 className='comment__author'>{author_name}</h1>
                <p className='comment__content'>{content}</p>
                <span className='comment__date'>{date}</span>
            </EditField>
        </li>
)

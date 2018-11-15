import React from 'react'

import EditField from '../renderProps/EditField'

import encodeQueryParams from '../helpers/encodeQueryParams'

const Comment = ({author_name, content, author, status, date, updateComment}) => {
    return (
        <li className='comment'>
            <h1 className='comment__author'>{author_name}</h1>
            <EditField afterEditFn={updateComment}>
                <p className='comment__content'>{content}</p>
            </EditField>
            <span className='comment__date'>{date}</span>
        </li>
    )
}

export default props => {
    const {id, putComment, getComments, postId, getJWTToken} = props

    const updateComment = updatedContent => {
        putComment({
            queryParams: `/${id}`,
            headers: {
              Authorization: `Bearer ${getJWTToken()}`,
              'Content-Type': 'application/json;UTF-8'
          },
            body: JSON.stringify({
                content: updatedContent,
                post: postId
            }),
            successCb: () => getComments(encodeQueryParams({postId})),
        })
    }

    return (
        <Comment {...props} updateComment={updateComment} />
    )
}

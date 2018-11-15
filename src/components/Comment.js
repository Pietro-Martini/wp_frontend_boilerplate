import React from 'react'

import EditField from '../renderProps/EditField'

import encodeQueryParams from '../helpers/encodeQueryParams'

const Comment = ({author_name, content, author, status, date, updateComment, removeComment}) => {
    return (
        <li className='comment'>
            <span className='comment__date'>{date}</span>
            <h1 className='comment__author'>{author_name}</h1>
            <EditField afterEditFn={updateComment}>
                <p className='comment__content'>{content}</p>
            </EditField>
            <button onClick={removeComment}>Delete</button>
        </li>
    )
}

export default props => {
    const {id, putComment, deleteComment, getComments, postId, getJWTToken} = props

    const jwtToken = getJWTToken()
    const successGetQueryParams = encodeQueryParams({postId})

    const updateComment = updatedContent => {
        putComment({
            queryParams: `/${id}`,
            headers: {
              Authorization: `Bearer ${jwtToken}`,
          },
            body: JSON.stringify({
                content: updatedContent,
                post: postId
            }),
            successCb: () => getComments(successGetQueryParams),
        })
    }

    const removeComment = () => {
        deleteComment({
            queryParams: `/${id}`,
            headers: {
              Authorization: `Bearer ${jwtToken}`,
          },
            successCb: () => getComments(successGetQueryParams)
        })
    }

    return (
        <Comment {...props}
            updateComment={updateComment}
            removeComment={removeComment}
        />
    )
}

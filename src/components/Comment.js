import React from 'react'

import EditField from '../renderProps/EditField'

import encodeQueryParams from '../helpers/encodeQueryParams'

const Comment = ({id, author_name, content, author, status, date, updateComment, removeComment, currentUserAuthorOfComment}) => {
    return (
        <li className='comment' key={id}>
            <span className='comment__date'>{date}</span>
            <h1 className='comment__author'>{author_name}</h1>
            <EditField fieldNonEditable={!currentUserAuthorOfComment} afterEditFn={updateComment}>
                <p className='comment__content'>{content}</p>
            </EditField>
            {currentUserAuthorOfComment && <button onClick={removeComment}>Delete</button>}
        </li>
    )
}

export default props => {
    const {id, putComment, deleteComment, getComments, postId, getJWTCredentials} = props

    const {token, userEmail} = getJWTCredentials()

    const postIdQueryParams = encodeQueryParams({postId})

    const updateComment = updatedContent => {
        putComment({
            queryParams: `/${id}`,
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json;UTF-8'
          },
            body: JSON.stringify({
                content: updatedContent,
                post: postId
            }),
            successCb: () => getComments(postIdQueryParams),
        })
    }

    const removeComment = () => {
        deleteComment({
            queryParams: `/${id}`,
            headers: {
              Authorization: `Bearer ${token}`,
          },
            successCb: () => getComments(postIdQueryParams)
        })
    }

    return (
        <Comment {...props}
            updateComment={updateComment}
            removeComment={removeComment}
            currentUserAuthorOfComment={userEmail === props.author_name}
        />
    )
}

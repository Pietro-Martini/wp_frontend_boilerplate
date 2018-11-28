import React from 'react'

import {CreateCommentForm} from '../renderProps/Form'

import encodeQueryParams from '../helpers/encodeQueryParams'

import Field from './Field'

const CreateCommentFormComponent = ({createComment}) => <CreateCommentForm onSubmit={createComment} />

export default ({postComment, getComments, postId, getJWTCredentials}) => {
    const {token} = getJWTCredentials()

    const createComment = body => postComment({
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;UTF-8'
      },
      body: JSON.stringify({
        ...body,
        post: postId
      }),
      successCb: () => getComments(encodeQueryParams({post: postId}))
  })

    return <CreateCommentFormComponent createComment={createComment} />
}

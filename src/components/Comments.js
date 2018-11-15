import React from 'react'

import Comment from './Comment'
import CreateCommentForm from './CreateCommentForm'

import encodeQueryParams from '../helpers/encodeQueryParams'

import {CommentsAPI} from '../renderProps/API'

import {AuthenticationConsumer} from '../providers/AuthenticationProvider'

class Comments extends React.Component {
    componentDidMount = () => {
        const {postId, getComments} = this.props

        getComments(encodeQueryParams({post: postId}))
    }

    render = () => {
        const {comments, postId, postComment, getComments, putComment, deleteComment, getJWTToken, loggedIn, setDataFetching} = this.props

        return (
            <div className='comments'>
                {
                  loggedIn && (
                    <div className='comments__create-comment'>
                      <CreateCommentForm
                          postId={postId}
                          postComment={postComment}
                          getComments={getComments}
                          getJWTToken={getJWTToken}
                      />
                    </div>
                  )
                }
                <ul className='comments__list'>
                    {comments.map(c => (
                        <Comment {...c}
                            key={c.id}
                            deleteComment={deleteComment}
                            putComment={putComment}
                            postId={postId}
                            getComments={getComments}
                            getJWTToken={getJWTToken}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}

export default ({postId, setDataFetching}) => (
    <AuthenticationConsumer>
      {({getJWTToken, loggedIn}) => (
        <CommentsAPI setDataFetching={setDataFetching}>
            {({comments, getComments, postComment, putComment, deleteComment}) => (
                <Comments
                    comments={comments.filter(c => c.status === 'approved')}
                    getComments={getComments}
                    postComment={postComment}
                    putComment={putComment}
                    deleteComment={deleteComment}
                    postId={postId}
                    loggedIn={loggedIn}
                    getJWTToken={getJWTToken}
                />
            )}
        </CommentsAPI>
      )}
    </AuthenticationConsumer>
)

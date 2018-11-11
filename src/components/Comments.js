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
        const {comments, postId, postComment, getJWTToken, isAuthenticated} = this.props

        return (
            <div className='comments'>
                <ul className='comments__list'>
                    {comments.map(c => <Comment {...c} />)}
                </ul>
                <div className='comments__create-comment'>
                  {
                    isAuthenticated() && (
                      <CreateCommentForm
                          postId={postId}
                          postComment={postComment}
                          getJWTToken={getJWTToken}
                      />
                    )
                  }
                </div>
            </div>
        )
    }
}

export default ({postId}) => (
    <AuthenticationConsumer>
      {({getJWTToken, isAuthenticated}) => (
        <CommentsAPI>
            {({comments, getComments, postComment}) => (
                <Comments
                    comments={comments.filter(c => c.status === 'approved')}
                    getComments={getComments}
                    postComment={postComment}
                    postId={postId}
                    isAuthenticated={isAuthenticated}
                    getJWTToken={getJWTToken}
                />
            )}
        </CommentsAPI>
      )}
    </AuthenticationConsumer>
)

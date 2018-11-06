import React from 'react'

import Comment from './Comment'

import encodeQueryParams from '../helpers/encodeQueryParams'

import {CommentsAPI} from '../renderProps/API'

class Comments extends React.Component {
    componentDidMount = () => {
        const {postId, getComments} = this.props

        getComments(encodeQueryParams({post: postId}))
    }

    render = () => {
        return (
            <div className='comments'>
                <ul className='comments__list'>
                    {this.props.comments.map(c => <Comment {...c} />)}
                </ul>
                <div className='comments__create-comment'>

                </div>
            </div>
        )
    }
}

export default ({postId}) => (
    <CommentsAPI>
        {({comments, getComments}) => (
            <Comments
                comments={comments.filter(c => c.status === 'approved')}
                getComments={getComments}
                postId={postId}
            />
        )}
    </CommentsAPI>
)

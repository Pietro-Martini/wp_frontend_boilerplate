import React from 'react'

import {PostsAPI} from '../renderProps/API'

import Post from './Post'

class Posts extends React.Component {
  componentDidMount = this.props.getPosts

  render = () => {
    return (
        <div className='posts'>
            <ul className='posts__list'>
                {this.props.posts.map(p => <Post {...p} />)}
            </ul>
        </div>
    )
  }
}

export default function (props) {
    return (
        <PostsAPI>
            {({posts, getPosts}) => {
                return (
                    <Posts
                        posts={posts}
                        getPosts={getPosts}
                    />
                )
            }}
        </PostsAPI>
    )
}

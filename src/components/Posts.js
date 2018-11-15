import React from 'react'

import {PostsAPI} from '../renderProps/API'

import Post from './Post'

class Posts extends React.Component {
  componentDidMount = this.props.getPosts

  render = () => {
    const {setDataFetching} = this.props

    return (
        <div className='posts'>
            <ul className='posts__list'>
                {this.props.posts.map(p => (
                    <Post
                        key={p.id}
                        {...p}
                        setDataFetching={setDataFetching}
                    />
                ))}
            </ul>
        </div>
    )
  }
}

export default function ({setDataFetching}) {
    return (
        <PostsAPI setDataFetching={setDataFetching}>
            {({posts, getPosts}) => {
                return (
                    <Posts
                        posts={posts}
                        getPosts={getPosts}
                        setDataFetching={setDataFetching}
                    />
                )
            }}
        </PostsAPI>
    )
}

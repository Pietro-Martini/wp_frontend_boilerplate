import React from 'react'

import {PostsAPI} from '../renderProps/API'

class About extends React.Component {
  componentDidMount = () => {
      this.props.getPosts()
  }

  render = () => {
    return (
        <div className='about'>
            {this.props.posts.map(p => {
                return p.slug
            })}
        </div>
    )
  }
}

export default function (props) {
    return (
        <PostsAPI>
            {({posts, getPosts}) => {
                return (
                    <About
                        posts={posts}
                        getPosts={getPosts}
                    />
                )
            }}
        </PostsAPI>
    )
}

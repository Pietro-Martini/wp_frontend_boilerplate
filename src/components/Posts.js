import React from 'react'

import {PostsAPI} from '../renderProps/API'

import Post from './Post'

export default ({posts, setDataFetching}) => {
  return (
    <div className='posts'>
      <ul className='posts__list'>
        {posts.map(p => (
          <Post
            key={p.id}
            setDataFetching={setDataFetching}
            {...p}
          />
        ))}
      </ul>
    </div>
  )
}

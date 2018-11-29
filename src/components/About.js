import React from 'react'

import Posts from './Posts'

export default ({posts, getPosts, setDataFetching}) => (
  <div className='about'>
    <Posts
      posts={posts}
      getPosts={getPosts}
      setDataFetching={setDataFetching}
    />
  </div>
)

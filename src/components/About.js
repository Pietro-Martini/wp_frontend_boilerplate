import React from 'react'

import Posts from './Posts'

export default ({posts, setDataFetching}) => (
  <div className='about'>
    <Posts
      posts={posts}
      setDataFetching={setDataFetching}
    />
  </div>
)

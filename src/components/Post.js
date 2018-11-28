import React from 'react'

import Comments from './Comments'

export default ({id, title, content, _embedded, setDataFetching}) => {
  const image = _embedded['wp:featuredmedia'] && _embedded['wp:featuredmedia'][0].source_url
  return (
    <li className='post'>
      <div className='post__body'>
        {image && (
          <div className='post__image'>
            <img src={image} />
          </div>
        )}        
        <h1 className='post__title'>{title.rendered}</h1>
        <p className='post__content'>{content.rendered}</p>
      </div>
      <Comments
        postId={id}
        setDataFetching={setDataFetching}
      />
    </li>
  )
}

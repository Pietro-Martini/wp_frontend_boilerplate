import React from 'react'
import {Link} from 'react-router-dom'

import encodeQueryParams from '../helpers/encodeQueryParams'
import convertToSlug from '../helpers/convertToSlug'

export default ({title, getPage}) => {
    const slug = convertToSlug(title)

    return (
      <li
          className='menu__item'
          onClick={e => getPage({queryParams: encodeQueryParams({slug})})}
      >
        <Link
          key={slug}
          to={`/${slug}`}
        >
          {title}
        </Link>
      </li>
    )
}

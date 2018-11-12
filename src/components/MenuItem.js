import React from 'react'
import {Link} from 'react-router-dom'

import encodeQueryParams from '../helpers/encodeQueryParams'

export default ({title, slug, getPage}) => (
  <li
      className='menu__item'
      onClick={e => getPage({queryParams: encodeQueryParams({slug})})}
  >
    <Link
      key={slug}
      to={`/${slug}`}
    >
      {title.rendered}
    </Link>
  </li>
)

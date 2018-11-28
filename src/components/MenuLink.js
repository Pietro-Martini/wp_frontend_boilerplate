import React from 'react'
import {Link} from 'react-router-dom'

import encodeQueryParams from '../helpers/encodeQueryParams'
import convertToSlug from '../helpers/convertToSlug'

export default ({title}) => {
    const slug = convertToSlug(title)

    return (
        <Link
          key={slug}
          to={`/${slug}`}
        >
          {title}
        </Link>
    )
}

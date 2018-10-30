import React from 'react'

import {PagesAPI} from '../renderProps/apiCommunicator'

import {Link} from 'react-router-dom'

const Menu = props => (
  <PagesAPI render={createLinks} />
)

const createLinks = pages => pages.map(({title, slug}) => {
  return (
    <Link
      key={slug}
      to={`/${slug}`}
    >
      {title.rendered}
    </Link>
  )
})

export default Menu

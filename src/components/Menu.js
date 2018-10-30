import React from 'react'

import {PagesAPI} from '../renderProps/apiCommunicator'

import {Link} from 'react-router-dom'

const Menu = props => (
  <PagesAPI render={pages => (
    <ul className='menu'>
      {createMenuItems(pages)}
    </ul>
  	)} />
)

const createMenuItems = pages => pages.map(({title, slug}) => {
  return (
    <li className='menu__item'>
      <Link
        key={slug}
        to={`/${slug}`}
      >
        {title.rendered}
      </Link>
    </li>
  )
})

export default Menu

import React from 'react'

import {Link} from 'react-router-dom'

import encodeQueryParams from '../helpers/encodeQueryParams'
import ActiveStateToggling from '../renderProps/ActiveStateToggling'

const Menu = ({pages, getPage}) => (
    <ActiveStateToggling>
        {({active, toggleActiveState}) => (
            <nav className='menu'>
                <div
                    className='menu__toggle'
                    onClick={toggleActiveState}
                >
                    Toggle Menu
                </div>
                <ul className={`menu__list ${active ? 'active' : ''}`}>
                    {createMenuItems(pages, getPage)}
                </ul>
            </nav>
        )}
    </ActiveStateToggling>
)

const createMenuItems = (pages, getPage) => pages.map(({title, slug}) => {
  return (
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
})

export default Menu

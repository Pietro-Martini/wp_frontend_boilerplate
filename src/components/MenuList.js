import React from 'react'
import {Link} from 'react-router-dom'

import MenuItem from './MenuItem'

import capitalize from '../helpers/capitalize'

export default ({pages, active, getPage, logout, isAuthenticated}) => (
  <ul className={`menu__list ${active ? 'active' : ''}`}>
      {pages.map(p => (
          <MenuItem
            {...p}
            getPage={getPage}
          />
        ))}
  </ul>
)

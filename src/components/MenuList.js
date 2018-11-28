import React from 'react'
import {Link} from 'react-router-dom'

import {MenuAPI} from '../renderProps/API'

import MenuItem from './MenuItem'
import MenuLink from './MenuLink'

import Login from './Login'

import capitalize from '../helpers/capitalize'

class MenuList extends React.Component {
  componentDidMount = this.props.getMenuItems

  render = () => {
      const {menuItems, active, logout, loggedIn} = this.props

      return (
          <ul className={`menu__list ${active ? 'active' : ''}`}>
              {menuItems.map(item => (
                  <MenuItem key={item.title}>
                      <MenuLink {...item} />
                  </MenuItem>
                ))}
                <MenuItem>
                    {createAccountLink(logout, loggedIn)}
                </MenuItem>
                {createRegisterLink(loggedIn)}
          </ul>
      )
  }
}

const createAccountLink = (logout, loggedIn) => (
    !loggedIn
    ? <Link to='/login'>Login</Link>
    : <a href='/logout' onClick={logout}>Logout</a>
)

const createRegisterLink = loggedIn => (
    !loggedIn
    ? <MenuItem><Link to='/register'>Register</Link></MenuItem>
    : null
)

export default props => (
    <MenuAPI setDataFetching={props.setDataFetching}>
        {({menuItems, getMenuItems}) => (
            <MenuList {...props}
                menuItems={menuItems }
                getMenuItems={getMenuItems}
            />
        )}
    </MenuAPI>
)

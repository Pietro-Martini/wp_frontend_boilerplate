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
      const {menuItems, active, getPage, logout, loggedIn} = this.props

      return (
          <ul className={`menu__list ${active ? 'active' : ''}`}>
              {menuItems.map(item => (
                  <MenuItem>
                      <MenuLink {...item} getPage={getPage} />
                  </MenuItem>
                ))}
                <MenuItem>
                    {createAccountLink(logout, loggedIn)}
                </MenuItem>
          </ul>
      )
  }
}

const createAccountLink = (logout, loggedIn) => (
    !loggedIn
    ? <Link to='/login'>Login</Link>
    : <a href='/logout' onClick={logout}>Logout</a>
)

export default props => (
    <MenuAPI>
        {({menuItems, getMenuItems}) => (
            <MenuList {...props}
                menuItems={menuItems }
                getMenuItems={getMenuItems}
            />
        )}
    </MenuAPI>
)

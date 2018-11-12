import React from 'react'
import {Link} from 'react-router-dom'

import {MenuAPI} from '../renderProps/API'

import MenuItem from './MenuItem'

import capitalize from '../helpers/capitalize'

class MenuList extends React.Component {
  componentDidMount = this.props.getMenuItems

  render = () => {
      const {menuItems, active, getPage, logout, isAuthenticated} = this.props      

      return (
          <ul className={`menu__list ${active ? 'active' : ''}`}>
              {menuItems.map(item => (
                  <MenuItem
                    {...item}
                    getPage={getPage}
                  />
                ))}
          </ul>
      )
  }
}

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

import React from 'react'

import ActiveStateToggling from '../renderProps/ActiveStateToggling'
import {AuthenticationConsumer} from '../providers/AuthenticationProvider'

import MenuList from './MenuList'
import MenuToggle from './MenuToggle'

const Menu = ({pages, getPage, active, toggleActiveState, logout, isAuthenticated}) => (
  <nav className='menu'>
      <MenuToggle
        toggleActiveState={toggleActiveState}
      />
      <MenuList
        pages={pages}
        active={active}
        getPage={getPage}
        logout={logout}
        isAuthenticated={isAuthenticated}
      />
  </nav>
)

export default ({pages, getPage}) => {
  return (
    <AuthenticationConsumer>
      {({logout, isAuthenticated}) => (
        <ActiveStateToggling>
          {(active, toggleActiveState) => (
            <Menu
              pages={pages}
              getPage={getPage}
              active={active}
              toggleActiveState={toggleActiveState}
              logout={logout}
              isAuthenticated={isAuthenticated}
            />
          )}
        </ActiveStateToggling>
      )}
    </AuthenticationConsumer>
  )
}

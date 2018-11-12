import React from 'react'

import ActiveStateToggling from '../renderProps/ActiveStateToggling'
import {AuthenticationConsumer} from '../providers/AuthenticationProvider'

import MenuList from './MenuList'
import MenuToggle from './MenuToggle'

const Menu = ({getPage, active, toggleActiveState, logout, loggedIn, history}) => (
  <nav className='menu'>
      <MenuToggle
        toggleActiveState={toggleActiveState}
      />
      <MenuList
        active={active}
        getPage={getPage}
        logout={logout}
        loggedIn={loggedIn}
      />
  </nav>
)

export default ({getPage}) => {
  return (
    <AuthenticationConsumer>
      {({logout, loggedIn}) => (
        <ActiveStateToggling>
          {(active, toggleActiveState) => (
            <Menu
              getPage={getPage}
              active={active}
              toggleActiveState={toggleActiveState}
              logout={logout}
              loggedIn={loggedIn}              
            />
          )}
        </ActiveStateToggling>
      )}
    </AuthenticationConsumer>
  )
}

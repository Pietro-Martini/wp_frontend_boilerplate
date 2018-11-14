import React from 'react'

import ActiveStateToggling from '../renderProps/ActiveStateToggling'
import {AuthenticationConsumer} from '../providers/AuthenticationProvider'

import MenuList from './MenuList'
import MenuToggle from './MenuToggle'

const Menu = ({getPage, active, toggleActiveState, logout, loggedIn, history, setDataFetching}) => (
  <nav className='menu'>
      <MenuToggle
        toggleActiveState={toggleActiveState}
      />
      <MenuList
        active={active}
        getPage={getPage}
        logout={logout}
        loggedIn={loggedIn}
        setDataFetching={setDataFetching}
      />
  </nav>
)

export default ({getPage, setDataFetching}) => {
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
              setDataFetching={setDataFetching}
            />
          )}
        </ActiveStateToggling>
      )}
    </AuthenticationConsumer>
  )
}

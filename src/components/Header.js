import React from 'react'

import Menu from '../components/Menu'

const Header = ({pages, getPage}) => {
  return (
    <Menu
        pages={pages}
        getPage={getPage}
    />
  )
}

export default Header

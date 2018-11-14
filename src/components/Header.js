import React from 'react'

import Menu from '../components/Menu'

const Header = ({pages, getPage, setDataFetching}) => {
  return (
    <Menu
        pages={pages}
        getPage={getPage}
        setDataFetching={setDataFetching}
    />
  )
}

export default Header

import React from 'react'

import Menu from '../components/Menu'

const Header = ({pages, getPage, setDataFetching}) => {
  return (
    <div className='header'>
      <Menu
          pages={pages}
          getPage={getPage}
          setDataFetching={setDataFetching}
      />
    </div>
  )
}

export default Header

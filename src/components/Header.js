import React from 'react'

import {PagesAPI} from '../renderProps/apiCommunicator'

const Header = props => {
  return <PagesAPI render={pages => {
    return <div>Header</div>
  }} />
}

export default Header

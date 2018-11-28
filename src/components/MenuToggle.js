import React from 'react'

export default ({toggleActiveState, active}) => (
  <div onClick={toggleActiveState} className={`menu__toggle ${active ? 'active' : ''}`}>
    <span></span>
    <span></span>
    <span></span>
  </div>
)

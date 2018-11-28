import React from 'react'

export default ({error}) => (
  error && (
    <div className='error'>
      <p>{error}</p>
    </div>
  )
)

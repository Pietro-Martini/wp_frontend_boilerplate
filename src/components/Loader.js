import React from 'react'

const Loader = ({dataFetching}) => (
    <div className={`loader ${!dataFetching ? 'inactive' : ''}`}>
      <div className='loader__icon'></div>
    </div>
)

export default Loader

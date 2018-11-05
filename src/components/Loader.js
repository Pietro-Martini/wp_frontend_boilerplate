import React from 'react'

const Loader = ({dataFetching}) => (
    dataFetching ? <p>Loading...</p> : null
)

export default Loader

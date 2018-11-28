import React from 'react'

import {Search} from '../icons/Search'

export default ({toggleActiveState}) => {    
    return (
        <div
            className='search-toggle'
            onClick={toggleActiveState}
        >
            <Search />
        </div>
    )
}

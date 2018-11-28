import React from 'react'

import {Link} from 'react-router-dom'

export default ({searchResults, searchResultsResetState, toggleActiveState}) => {
  return (
    <ul className='search-list'>
      {searchResults.results.map(({title, slug}) => (
        <li key={slug} onClick={toggleActiveState}>
          <Link to={`${slug}`}>
            <h1>{title}</h1>
          </Link>
        </li>
      ))}
    </ul>
  )
}

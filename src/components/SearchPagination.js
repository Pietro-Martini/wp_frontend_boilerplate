import React from 'react'

import encodeQueryParams from '../helpers/encodeQueryParams'

const SearchPagination = ({
  pages,
  handleNumClick,
  handleBackClick,
  handleNextClick,
  paginationUpdateCb
}) => {
  return pages.length ? (
    <div className='pagination'>
      <div onClick={e => handleBackClick(paginationUpdateCb)}>Previous</div>
      	<ul className='pagination__list'>
        {pages.map(p => (
          <li onClick={e => handleNumClick(p, paginationUpdateCb)}>{p}</li>
      		))}
      	</ul>
      <div onClick={e => handleNextClick(paginationUpdateCb)}>Next</div>
    </div>
  ) : null
}

export default props => {
  const paginationUpdateCb = page => {
  	const queryParams = encodeQueryParams({page, search: props.search})
  	props.getSearchResults({queryParams})
  }

  return (
    <SearchPagination
      pages={props.pages}
      handleNumClick={props.handleNumClick}
      handleBackClick={props.handleBackClick}
      handleNextClick={props.handleNextClick}
      paginationUpdateCb={paginationUpdateCb}
    />
  )
}
